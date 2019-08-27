import update from 'immutability-helper'
import find from 'lodash/find'

function findDefaultAddress(addressLookup, addresses) {
   var found = find(addresses.edges, function(o) {
      return o.node.address1 === addressLookup
   })

   if (found) {
      return found.node
   }

   return false
}

function CustomersReducer(state, action) {
   switch (action.type) {
      case 'SET_CUSTOMER': {
         return {
            ...state,
            customer: update(state.customer, { $set: action.payload })
         }
      }
      
      case 'SET_SELECTED_ADDRESS': {
         return {
            ...state,
            selectedAddress: update(state.selectedAddress, { $set: action.payload })
         }
      }

      case 'SET_DEFAULT_ADDRESS': {
         if (!action.payload) {
            return {
               ...state
            }
         }
         return {
            ...state,
            defaultAddress: update(state.defaultAddress, { $set: findDefaultAddress(action.payload.defaultAddress.address1, action.payload.addresses) })
         }
      }

      case 'SET_INNER_PAGE': {
         return {
            ...state,
            onInnerPage: update(state.onInnerPage, { $set: action.payload })
         }
      }

      case 'SET_SELECTED_ORDER_DETAILS': {
         return {
            ...state,
            selectedOrderDetails: update(state.selectedOrderDetails, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CustomersReducer`)
      }
   }
}

export { CustomersReducer }
