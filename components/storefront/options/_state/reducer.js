import update from 'immutability-helper'

function StorefrontOptionsReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_BOOTSTRAPPING': {
         return {
            ...state,
            isBootstrapping: update(state.isBootstrapping, { $set: action.payload })
         }
      }

      case 'SET_FILTER_OPTIONS': {
         return {
            ...state,
            filterOptions: update(state.filterOptions, { $set: action.payload })
         }
      }
      default: {
         throw new Error(`Unhandled action type: ${action.type} in StorefrontOptionsReducer`)
      }
   }
}

export { StorefrontOptionsReducer }
