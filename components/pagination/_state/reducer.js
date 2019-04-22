import update from 'immutability-helper'

function PaginationReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_LAST_PAYLOAD': {
         return {
            ...state,
            lastPayload: action.payload
         }
      }
      case 'SET_IS_FIRST_LOAD': {
         return {
            ...state,
            isFirstLoad: action.payload
         }
      }
      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: action.payload
         }
      }
      case 'SET_PAYLOAD': {
         return {
            ...state,
            payload: action.payload
         }
      }
      case 'SET_HAS_MORE_ITEMS': {
         return {
            ...state,
            hasMoreItems: action.payload
         }
      }

      case 'SET_QUERY_PARAMS': {
         return {
            ...state,
            queryParams: update(state.queryParams, { $merge: action.payload })
         }
      }

      default: {
         return state
      }
   }
}

export { PaginationReducer }
