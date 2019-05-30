import update from 'immutability-helper'

function CartReducer(state, action) {
   switch (action.type) {
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
