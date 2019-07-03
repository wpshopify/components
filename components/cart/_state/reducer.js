import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import some from 'lodash/some'
import concat from 'lodash/concat'
import { toggleCart, closeCart } from '../../../common/cart'

function CartReducer(state, action) {
   switch (action.type) {
      case 'TOGGLE_CART':
         let isCartOpen = toggleCart()

         return {
            ...state,
            isCartOpen: update(state.isCartOpen, { $set: isCartOpen })
         }
      case 'SET_IS_CHECKING_OUT':
         return {
            ...state,
            isCheckingOut: update(state.isCheckingOut, { $set: action.payload })
         }
      case 'SET_TERMS_ACCEPTED':
         return {
            ...state,
            termsAccepted: update(state.termsAccepted, { $set: action.payload })
         }
      case 'UPDATE_NOTICES': {
         let updatedNotices = state.notices

         if (isEmpty(action.payload)) {
            updatedNotices = action.payload
         } else {
            if (!some(state.notices, action.payload)) {
               updatedNotices = concat(state.notices, [action.payload])
            } else {
               updatedNotices = state.notices
            }
         }

         return {
            ...state,
            notices: update(state.notices, { $set: updatedNotices })
         }
      }
      case 'SET_IS_CART_EMPTY': {
         return {
            ...state,
            isCartEmpty: update(state.isCartEmpty, { $set: action.payload })
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

         // WP_Shopify.dispatch('wpshopify-checkout-total', updatedCheckoutCache)

         return {
            ...state,
            checkoutCache: updatedCheckoutCache
         }
      }

      case 'UPDATE_CHECKOUT_ATTRIBUTES': {
         let attributes = uniqWith(concat(state.customAttributes, [action.payload]), isEqual)

         return {
            ...state,
            customAttributes: update(state.customAttributes, { $set: attributes })
         }
      }

      case 'SET_CHECKOUT_ATTRIBUTES': {
         if (isEmpty(action.payload)) {
            var newCheckoutAttributes = []
         } else {
            var newCheckoutAttributes = [action.payload]
         }

         return {
            ...state,
            customAttributes: update(state.customAttributes, { $set: newCheckoutAttributes })
         }
      }

      case 'SET_CHECKOUT_NOTE': {
         return {
            ...state,
            note: update(state.note, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CartReducer`)
      }
   }
}

export { CartReducer }
