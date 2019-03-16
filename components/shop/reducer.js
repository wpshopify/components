import { getCheckoutCache, setCheckoutCache, mergeCheckoutCacheVariants, mergeCheckoutCacheLineItems, getProducts } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import some from 'lodash/some';
import flattenDepth from 'lodash/flattenDepth';
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import head from 'lodash/head';

import { calcCheckoutTotal, calcLineItemTotal } from '../../common/products';

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

   var productInfoAndVariants = addProductInfoToVariants(productsFromCart, shopState);
   var variantsMulti = onlyVariantsInCheckout(productInfoAndVariants);
   var variantsCombined = combineAllVariants(variantsMulti);

   return variantsCombined;

}







function ShopReducer(state, action) {

   switch (action.type) {

      case "SET_CHECKOUT": {

         return {
            ...state,
            checkout: action.payload
         }
      }

      case "NOTIFY_CART": {

         return {
            ...state,
            notifyingCart: action.payload
         }
      }

      case "SET_CHECKOUT_CACHE": {

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

      }

      case "UPDATE_CHECKOUT_CACHE": {

         var checkoutCache = getCheckoutCache(action.payload.checkoutID);

         // If the store doesn't exist, set it to our intial state from the reducer
         if (!checkoutCache) {

            checkoutCache = {
               lineItems: action.payload.lineItems,
               variants: action.payload.variants
            }

            setCheckoutCache(action.payload.checkoutID, checkoutCache);

         } else {

            checkoutCache = {
               lineItems: mergeCheckoutCacheLineItems(checkoutCache.lineItems, action.payload.lineItems),
               variants: mergeCheckoutCacheVariants(checkoutCache.variants, action.payload.variants)
            }

            setCheckoutCache(action.payload.checkoutID, checkoutCache);

         }

         return {
            ...state,
            checkoutCache: checkoutCache
         }

      }

      case "SET_CHECKOUT_CACHE_LINE_ITEMS": {

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

      }

      case "REMOVE_LINE_ITEM": {

         const updatedCheckoutCache = state.checkoutCache;

         const updateLineItems = filter(updatedCheckoutCache.lineItems, (o) => o.variantId !== action.payload);
         const updateVariants = filter(updatedCheckoutCache.variants, (o) => o.id !== action.payload);

         updatedCheckoutCache.lineItems = updateLineItems;
         updatedCheckoutCache.variants = updateVariants;

         setCheckoutCache(state.checkout.id, updatedCheckoutCache);

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }

      }


      case "UPDATE_LINE_ITEM_QUANTITY": {

         const updatedCheckoutCache = state.checkoutCache;

         const updateLineItems = updatedCheckoutCache.lineItems.map(lineItem => {

            if (lineItem.variantId === action.payload.variantId) {
               lineItem.quantity = action.payload.lineItemNewQuantity;
            }

            return lineItem;

         });

         updatedCheckoutCache.lineItems = updateLineItems;

         setCheckoutCache(state.checkout.id, updatedCheckoutCache);

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }

      }

      case "SET_CHECKOUT_TOTAL": {

         const updatedCheckoutCache = state.checkoutCache;

         var checkoutTotal = calcCheckoutTotal(updatedCheckoutCache);

         updatedCheckoutCache.total = checkoutTotal;

         setCheckoutCache(state.checkout.id, updatedCheckoutCache);


         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }

      }

      case "UPDATE_CHECKOUT_TOTAL": {

         const updatedCheckoutCache = state.checkoutCache;

         var oldTotal = calcLineItemTotal(action.payload.lineItemOldQuantity, action.payload.lineItemPrice);
         var newTotal = calcLineItemTotal(action.payload.lineItemNewQuantity, action.payload.lineItemPrice);

         var checkoutTotalMinusOldLineItemTotal = updatedCheckoutCache.total - oldTotal;
         var finalTotal = checkoutTotalMinusOldLineItemTotal += newTotal;

         updatedCheckoutCache.total = finalTotal;

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }

      }

      case "SET_IS_CART_EMPTY": {

         const updatedCheckoutCache = state.checkoutCache;

         updatedCheckoutCache.isCartEmpty = action.payload;

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }
      }

      case "IS_READY": {

         return {
            ...state,
            isReady: true
         }
      }

      default: {
         return state;
      }

   }


}

export {
   ShopReducer
}