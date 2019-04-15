import update from 'immutability-helper'

function updateIsFirstRender(isFirstRender, payload) {
   return update(isFirstRender, { $set: payload })
}

function SearchReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: action.payload
         }
      }

      case 'SET_SEARCH_DATA': {
         return {
            ...state,
            searchData: action.payload
         }
      }

      case 'SET_SEARCH_TERM': {
         return {
            ...state,
            searchTerm: action.payload
         }
      }

      case 'SET_IS_FIRST_RENDER': {
         return {
            ...state,
            isFirstRender: updateIsFirstRender(state.isFirstRender, action.payload)
         }
      }

      default: {
         return state
      }
   }
}

export { SearchReducer }
