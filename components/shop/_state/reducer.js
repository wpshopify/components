import { getCheckoutCache, setCheckoutCache, mergeCheckoutCacheVariants, mergeCheckoutCacheLineItems } from '@wpshopify/api'
import some from 'lodash/some'
import flattenDepth from 'lodash/flattenDepth'
import assign from 'lodash/assign'
import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import update from 'immutability-helper'
import find from 'lodash/find'
import { calcCheckoutTotal } from '../../../common/products'

/*

Responsible for: adding product info to the variant information

*/
function addProductInfoToVariants(productsFromCart, checkoutCache) {
   return productsFromCart.map(product => {
      return {
         productInfo: {
            productTitle: product.title,
            productId: product.id
         },
         variants: flattenDepth(
            product.variants.filter(variant => {
               return some(checkoutCache.variants, { id: variant.id })
            }),
            1
         )
      }
   })
}

/*

Responsible for: only finding variants within the checkout

*/
function onlyVariantsInCheckout(allVariantsAndProducts) {
   return allVariantsAndProducts.map(variantsAndProducts => {
      return {
         variants: variantsAndProducts.variants.map(variant => {
            return assign(variant, variantsAndProducts.productInfo)
         })
      }
   })
}

/*

Responsible for: combining all variants

*/
function combineAllVariants(variants) {
   return reduce(
      variants,
      function(result, value, key) {
         return result.concat(value.variants)
      },
      []
   )
}

/*

Responsible for: finding variants from product ids

*/
function findVariantsFromProductIds(productsFromShopify, checkoutCache) {
   var productInfoAndVariants = addProductInfoToVariants(productsFromShopify, checkoutCache)
   var variantsMulti = onlyVariantsInCheckout(productInfoAndVariants)
   var variantsCombined = combineAllVariants(variantsMulti)

   return variantsCombined
}

/*

Responsible for: Only returning "available" line items. E.g., if Shop owner 
removes a variant, this keeps our cache up to date

*/
function findLineItemsFromProducts(productsFromShopify, checkoutCache) {
   return checkoutCache.lineItems.filter(lineItem => {
      return find(productsFromShopify, function(product) {
         return find(product.variants, { id: lineItem.variantId })
      })
   })
}

/*

Responsible for: checking whether the cart is empty or not

*/
function isCartEmpty(lineItems) {
   return lineItems.length === 0
}

/*

Responsible for: updating the ShopState "lineItems"

*/
function updateLineItemQuantity(state, payload) {
   state.lineItems = state.lineItems.map(lineItem => {
      if (lineItem.variantId === payload.variantId) {
         lineItem.quantity = payload.lineItemNewQuantity
      }

      return lineItem
   })

   return state
}

/*

Responsible for: updating the checkout cache

*/
function updateLineItemsAndVariants(checkoutCache, payload) {
   return {
      lineItems: mergeCheckoutCacheLineItems(checkoutCache.lineItems, payload.lineItems),
      variants: mergeCheckoutCacheVariants(checkoutCache.variants, payload.variants)
   }
}

/*

Responsible for: setting line items and variants

// payload.products comes from the Shopify request on each page load

*/
function setLineItemsAndVariants(checkoutCache, payload) {
   return {
      lineItems: findLineItemsFromProducts(payload.products, checkoutCache),
      variants: findVariantsFromProductIds(payload.products, checkoutCache)
   }
}

/*

Responsible for: removing line items and variants

*/
function removeLineItemsAndVariants(checkoutCache, payload) {
   checkoutCache.lineItems = filter(checkoutCache.lineItems, o => o.variantId !== payload)
   checkoutCache.variants = filter(checkoutCache.variants, o => o.id !== payload)

   return checkoutCache
}

/*

Responsible for: setting the checkout total

*/
function updateCheckoutTotal(checkoutCache) {
   checkoutCache.total = calcCheckoutTotal(checkoutCache)

   return checkoutCache
}

function ShopReducer(state, action) {
   switch (action.type) {
      case 'SET_CHECKOUT': {
         return {
            ...state,
            checkout: action.payload
         }
      }

      case 'NOTIFY_CART': {
         return {
            ...state,
            notifyingCart: action.payload
         }
      }

      case 'SET_CHECKOUT_CACHE': {
         const checkoutCache = getCheckoutCache(action.payload.id)

         // If the store doesn't exist, set it to our intial state from the reducer
         if (!checkoutCache) {
            setCheckoutCache(action.payload.id, state.checkoutCache)

            return {
               ...state,
               checkoutCache: state.checkoutCache
            }
         }

         return {
            ...state,
            checkoutCache: checkoutCache
         }
      }

      case 'UPDATE_LINE_ITEMS_AND_VARIANTS': {
         const checkoutCacheUpdated = update(state.checkoutCache, {
            $apply: checkoutCache => updateLineItemsAndVariants(checkoutCache, action.payload)
         })

         setCheckoutCache(action.payload.checkoutID, checkoutCacheUpdated)

         return {
            ...state,
            checkoutCache: checkoutCacheUpdated
         }
      }

      case 'SET_LINE_ITEMS_AND_VARIANTS': {
         const newCheckoutCache = update(state.checkoutCache, {
            $apply: checkoutCache => setLineItemsAndVariants(checkoutCache, action.payload)
         })

         // action.payload.products comes from an API call during bootstrap
         setCheckoutCache(state.checkout.id, newCheckoutCache)

         return {
            ...state,
            checkoutCache: newCheckoutCache
         }
      }

      case 'REMOVE_LINE_ITEM': {
         const newCheckoutCache = update(state.checkoutCache, {
            $apply: checkoutCache => removeLineItemsAndVariants(checkoutCache, action.payload)
         })

         setCheckoutCache(state.checkout.id, newCheckoutCache)

         return {
            ...state,
            checkoutCache: newCheckoutCache
         }
      }

      case 'UPDATE_LINE_ITEM_QUANTITY': {
         const checkoutCacheUpdated = update(state.checkoutCache, {
            $apply: stateObj => updateLineItemQuantity(stateObj, action.payload)
         })

         setCheckoutCache(state.checkout.id, checkoutCacheUpdated)

         return {
            ...state,
            isCartEmpty: isCartEmpty(checkoutCacheUpdated.lineItems),
            checkoutCache: checkoutCacheUpdated
         }
      }

      case 'UPDATE_CHECKOUT_TOTAL': {
         const updatedCheckoutCache = update(state.checkoutCache, {
            $apply: checkoutCache => updateCheckoutTotal(checkoutCache)
         })

         setCheckoutCache(state.checkout.id, updatedCheckoutCache)

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }
      }

      case 'SET_IS_CART_EMPTY': {
         return {
            ...state,
            isCartEmpty: action.payload
         }
      }

      case 'IS_SHOP_READY': {
         return {
            ...state,
            isShopReady: true
         }
      }

      default: {
         return state
      }
   }
}

export { ShopReducer }
