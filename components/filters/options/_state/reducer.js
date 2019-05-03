import update from 'immutability-helper'

function FiltersOptionsReducer(state, action) {
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
         return state
      }
   }
}

export { FiltersOptionsReducer }
