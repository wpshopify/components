import update from 'immutability-helper'
import find from 'lodash/find'
import assign from 'lodash/assign'

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

      case 'ADD_CUSTOMER_ADDRESS': {
         console.log('action.payload', action.payload)
         console.log('state.customer', state.customer)

         var newAddressesArray = update(state.customer.addresses.edges, { $push: [{ node: action.payload }] })

         console.log('newAddressesArray', newAddressesArray)

         return {
            ...state,
            customer: update(state.customer, {
               $apply: customer => {
                  customer.addresses = {
                     edges: newAddressesArray
                  }

                  return customer
               }
            })
         }
      }

      case 'UPDATE_CUSTOMER_ADDRESS': {
         var mapped = state.customer.addresses.edges.map(address => {
            if (address.node.id === action.payload.oldAddressId) {
               return {
                  node: update(address.node, { $set: action.payload.newAddress })
               }
            }

            return address
         })

         return {
            ...state,
            customer: update(state.customer, {
               $apply: customer => {
                  customer.addresses = {
                     edges: mapped
                  }

                  return customer
               }
            })
         }
      }

      case 'SET_DEFAULT_ADDRESS': {
         if (!action.payload) {
            return {
               ...state
            }
         }
         console.log('SET_DEFAULT_ADDRESSSET_DEFAULT_ADDRESSSET_DEFAULT_ADDRESSSET_DEFAULT_ADDRESS')
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
