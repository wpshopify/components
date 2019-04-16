function FiltersOptionsReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_BOOTSTRAPPING': {
         return {
            ...state,
            isBootstrapping: action.payload
         }
      }

      case 'SET_FILTER_OPTIONS': {
         return {
            ...state,
            filterOptions: action.payload
         }
      }
      default: {
         return state
      }
   }
}

export { FiltersOptionsReducer }
