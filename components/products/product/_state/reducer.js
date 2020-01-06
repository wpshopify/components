import update from 'immutability-helper'
import { findVariantFromSelectedOptions } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

function ProductReducer(state, action) {
   switch (action.type) {
      case 'SET_SELECTED_VARIANT': {

         if (!action.payload) {
            return {
               ...state,
               selectedVariant: false
            }
         }

         return {
            ...state,
            selectedVariant: findVariantFromSelectedOptions(action.payload.product, action.payload.selectedOptions)
         }
      }

      case 'SET_HAS_MANY_IMAGES': {
         return {
            ...state,
            hasManyImages: update(state.hasManyImages, { $set: action.payload })
         }
      }

      case 'SET_ADDED_VARIANT': {
         return {
            ...state,
            addedToCart: update(state.addedToCart, { $set: { variant: action.payload, at: new Date() } })
         }
      }

      case 'TOGGLE_DROPDOWN': {
         return {
            ...state,
            isDropdownOpen: update(state.isDropdownOpen, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ProductReducer`)
      }
   }
}

export { ProductReducer }
