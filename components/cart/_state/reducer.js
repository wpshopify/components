import update from 'immutability-helper'

function CartReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_CHECKING_OUT':
         return {
            ...state,
            isCheckingOut: update(state.isCheckingOut, { $set: action.payload })
         }
      case 'SET_TERMS_ACCEPTED':
         return {
            ...state,
            termsAccepted: update(state.termsAccepted, { $set: action.payload })
         }
      default: {
         throw new Error(`Unhandled action type: ${action.type} in CartReducer`)
      }
   }
}

export { CartReducer }
