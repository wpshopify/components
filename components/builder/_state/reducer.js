import update from 'immutability-helper'

function BuilderReducer(state, action) {
   switch (action.type) {
      case 'IS_READY': {
         return {
            ...state,
            isReady: update(state.isShopReady, { $set: true })
         }
      }

      case 'SET_SHORTCODE': {
         return {
            ...state,
            shortcode: update(state.shortcodeValue, { $set: action.payload })
         }
      }

      case 'UPDATE_SETTING':
         const newSettings = {
            ...state
         }

         newSettings.settings[action.payload.key] = update(state[action.payload.key], { $set: action.payload.value })

         return newSettings

      default: {
         throw new Error(`Unhandled action type: ${action.type} in BuilderReducer`)
      }
   }
}

export { BuilderReducer }
