import update from 'immutability-helper'

function CartReducer(state, action) {
   switch (action.type) {
      case 'OPEN_CART':
         return {
            ...state,
            cartOpen: true
         }

      case 'CLOSE_CART':
         return {
            ...state,
            cartOpen: false
         }
      case 'SET_IS_CHECKING_OUT':
         return {
            ...state,
            isCheckingOut: update(state.isCheckingOut, { $set: action.payload })
         }
      default:
         return state
   }
}

export { CartReducer }
