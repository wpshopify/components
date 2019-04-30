function ProductOptionReducer(state, action) {
   switch (action.type) {
      case 'SET_SELECTED_OPTION': {
         return {
            ...state,
            selectedOption: action.payload
         }
      }

      case 'SET_IS_OPTION_SELECTED': {
         return {
            ...state,
            isOptionSelected: action.payload
         }
      }

      case 'TOGGLE_DROPDOWN': {
         return {
            ...state,
            isDropdownOpen: action.payload
         }
      }

      default: {
         return state
      }
   }
}

export { ProductOptionReducer }
