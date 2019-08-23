import update from 'immutability-helper'

function CustomersReducer(state, action) {
   switch (action.type) {
      case 'SET_CUSTOMER': {
         return {
            ...state,
            payload: update(state.payload, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CustomersReducer`)
      }
   }
}

export { CustomersReducer }
