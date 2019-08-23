import update from 'immutability-helper'

function CustomersReducer(state, action) {
   switch (action.type) {
      case 'SET_CUSTOMER': {
         return {
            ...state,
            customer: update(state.customer, { $set: action.customer })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CustomersReducer`)
      }
   }
}

export { CustomersReducer }
