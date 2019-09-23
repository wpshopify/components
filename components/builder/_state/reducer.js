import update from 'immutability-helper'

function BuilderReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_READY': {
         return {
            ...state,
            isReady: update(state.isShopReady, { $set: action.payload })
         }
      }

      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: update(state.isLoading, { $set: action.payload })
         }
      }

      case 'SET_SHORTCODE': {
         return {
            ...state,
            shortcode: update(state.shortcodeValue, { $set: action.payload })
         }
      }

      case 'UPDATE_SETTING':
         const newSettings = state.settings

         var newProductOptions = state.productOptions[0]

         newProductOptions.componentOptions[action.payload.key] = action.payload.value

         newProductOptions.componentOptions = update(state.productOptions[0].componentOptions, { $set: newProductOptions.componentOptions })

         newSettings[action.payload.key] = update(state[action.payload.key], { $set: action.payload.value })

         return {
            ...state,
            settings: newSettings,
            productOptions: [newProductOptions]
         }

      case 'SET_PAYLOAD':
         var newProductOptions = state.productOptions[0]

         var newpayload = update(newProductOptions.componentPayload, { $set: action.payload })

         newProductOptions.componentPayload = newpayload

         return {
            ...state,
            payload: update(state.payload, { $set: action.payload }),
            productOptions: [newProductOptions]
         }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in BuilderReducer`)
      }
   }
}

export { BuilderReducer }
