import update from 'immutability-helper'

function SearchReducer(state, action) {
   switch (action.type) {
      case 'SET_SEARCH_TERM': {
         return {
            ...state,
            searchTerm: update(state.searchTerm, { $set: action.payload })
         }
      }

      default: {
         return state
      }
   }
}

export { SearchReducer }
