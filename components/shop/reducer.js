import { getCheckoutCache, setCheckoutCache, mergeCheckoutCacheVariants, mergeCheckoutCacheLineItems, getProducts } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import some from 'lodash/some';
import flattenDepth from 'lodash/flattenDepth';
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';


function addProductInfoToVariants(productsFromCart, shopState) {

   return productsFromCart.map((product) => {
      return {
         productInfo: {
            productTitle: product.title,
            productId: product.id
         },
         variants: flattenDepth(product.variants.filter((variant) => {
            return some(shopState.variants, { 'id': variant.id });
         }), 1)
      }

   });

}


function onlyVariantsInCheckout(allVariantsAndProducts) {
   return allVariantsAndProducts.map((variantsAndProducts) => {
      return {
         variants: variantsAndProducts.variants.map(variant => {
            return assign(variant, variantsAndProducts.productInfo);
         })
      }
   });
}

function combineAllVariants(variants) {
   return reduce(variants, function (result, value, key) {
      return result.concat(value.variants);
   }, []);
}

function findVariantsFromProductIds(productsFromCart, shopState) {

   // var shopState = getCheckoutCache(checkoutId);

   var productInfoAndVariants = addProductInfoToVariants(productsFromCart, shopState);

   var variantsMulti = onlyVariantsInCheckout(productInfoAndVariants);

   var variantsCombined = combineAllVariants(variantsMulti);

   return variantsCombined;

}







function ShopReducer(state, action) {

   switch (action.type) {

      case "SET_CHECKOUT":

         return {
            ...state,
            checkout: action.payload,
            totalPrice: action.payload.totalPrice
         }

      case "UPDATE_CHECKOUT": // should replace since were using cache 

         // action.payload === totalPrice
         console.log('UPDATE_CHECKOUT ', action.payload);

         return {
            ...state,
            checkout: action.payload
         }

      case "NOTIFY_CART":

         // action.payload === totalPrice
         console.log('NOTIFY_CART ', action.payload);

         return {
            ...state,
            notifyingCart: action.payload
         }

      case "SET_CHECKOUT_CACHE":

         var checkoutCache = getCheckoutCache(action.payload.id);

         // If the store doesn't exist, set it to our intial state from the reducer
         if (!checkoutCache) {

            setCheckoutCache(action.payload.id, state.checkoutCache);
            checkoutCache = state.checkoutCache;

         }

         return {
            ...state,
            checkoutCache: checkoutCache
         }

      case "UPDATE_CHECKOUT_CACHE":

         var checkoutCache = getCheckoutCache(action.payload.checkoutID);
         console.log('?? checkoutCache ', checkoutCache);

         // // If the store doesn't exist, set it to our intial state from the reducer
         if (!checkoutCache) {

            checkoutCache = {
               lineItems: action.payload.lineItems,
               variants: action.payload.variants
            }

            setCheckoutCache(action.payload.checkoutID, checkoutCache);

         } else {

            console.log('Updating checkout action.payload.lineItems with ...', action.payload.lineItems);

            checkoutCache = {
               lineItems: mergeCheckoutCacheLineItems(checkoutCache.lineItems, action.payload.lineItems),
               variants: mergeCheckoutCacheVariants(checkoutCache.variants, action.payload.variants)
            }

            console.log('Updating checkout checkoutCache ...', checkoutCache);

            setCheckoutCache(action.payload.checkoutID, checkoutCache);

         }



         return {
            ...state,
            checkoutCache: checkoutCache
         }

      case "SET_CHECKOUT_CACHE_LINEITEMS":

         // action.payload.products comes from an API call during bootstrap

         const newCheckoutCache = {
            lineItems: state.checkoutCache.lineItems,
            variants: findVariantsFromProductIds(action.payload.products, state.checkoutCache)
         }

         setCheckoutCache(state.checkout.id, newCheckoutCache);


         return {
            ...state,
            checkoutCache: newCheckoutCache
         }

      case "IS_READY":

         return {
            ...state,
            isReady: true
         }

      default:
         return state;

   }

}

export {
   ShopReducer
}