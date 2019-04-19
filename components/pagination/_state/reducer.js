function PaginationReducer(state, action) {
   switch (action.type) {
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
