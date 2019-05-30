import update from 'immutability-helper'

function ProductOptionReducer(state, action) {
   switch (action.type) {
      case 'SET_SELECTED_OPTION': {
         return {
            ...state,
            selectedOption: update(state.selectedOption, { $set: action.payload })
         }
      }

      case 'SET_IS_OPTION_SELECTED': {
         return {
            ...state,
            isOptionSelected: update(state.isOptionSelected, { $set: action.payload })
         }
      }

      case 'TOGGLE_DROPDOWN': {
         return {
            ...state,
            isDropdownOpen: update(state.isDropdownOpen, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ProductOptionReducer`)
      }
   }
}

export { ProductOptionReducer }
