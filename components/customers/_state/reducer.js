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

   if (!addresses) {
      return false
   }
   var lastIndex = addresses.edges.length - 1
   return addresses.edges[lastIndex].node
}

function CustomersReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_READY': {
         return {
            ...state,
            isReady: update(state.isReady, { $set: action.payload })
         }
      }

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
         var newAddressesArray = update(state.customer.addresses.edges, { $push: [{ node: action.payload }] })

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

      case 'DELETE_CUSTOMER_ADDRESS': {
         var newCustomer = update(state.customer, {
            $apply: customer => {
               var okasfdoksa = customer.addresses.edges.filter(function(address) {
                  return address.node.id !== action.payload
               })

               customer.addresses = {
                  edges: okasfdoksa
               }

               return customer
            }
         })

         return {
            ...state,
            customer: newCustomer,
            defaultAddress: update(state.defaultAddress, { $set: findDefaultAddress(state.defaultAddress.address1, newCustomer.addresses) })
         }
      }

      case 'SET_DEFAULT_ADDRESS': {
         if (!action.payload || !action.payload.defaultAddress) {
            return {
               ...state
            }
         }

         var foundDefaultAddress = findDefaultAddress(action.payload.defaultAddress.address1, action.payload.addresses)

         var updatedDefaultAddress = update(state.defaultAddress, { $set: foundDefaultAddress })

         return {
            ...state,
            defaultAddress: updatedDefaultAddress
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

      case 'SET_NOTICES': {
         return {
            ...state,
            notices: update(state.notices, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CustomersReducer`)
      }
   }
}

export { CustomersReducer }
