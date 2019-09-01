import update from 'immutability-helper'

function AddressesReducer(state, action) {
   switch (action.type) {
      case 'SET_NOTICES': {
         return {
            ...state,
            notices: update(state.notices, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in AddressesReducer`)
      }
   }
}

export { AddressesReducer }
