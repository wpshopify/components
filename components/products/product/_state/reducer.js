import { findVariantFromSelectedOptions } from '@wpshopify/api'

function ProductReducer(state, action) {
   switch (action.type) {
      case 'SET_SELECTED_VARIANT': {
         return {
            ...state,
            selectedVariant: findVariantFromSelectedOptions(action.payload.product, action.payload.selectedOptions)
         }
      }

      default: {
         return state
      }
   }
}

export { ProductReducer }
