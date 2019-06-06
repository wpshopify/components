import { filterAvailableVariantsBySelectedOption } from '../../../../../common/products'
import update from 'immutability-helper'

function ProductBuyButtonReducer(state, action) {
   switch (action.type) {
      case 'SET_ALL_SELECTED_OPTIONS':
         return {
            ...state,
            allOptionsSelected: action.payload
         }

      case 'UNSET_SELECTED_OPTIONS':
         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $unset: [action.payload] })
         }

      case 'UPDATE_SELECTED_OPTIONS':
         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $merge: action.payload })
         }

      case 'REMOVE_SELECTED_OPTIONS':
         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $set: {} })
         }

      case 'SET_MISSING_SELECTIONS':
         return {
            ...state,
            missingSelections: action.payload
         }

      case 'SET_AVAILABLE_VARIANTS':
         return {
            ...state,
            availableVariants: update(state.product, {
               $apply: product => filterAvailableVariantsBySelectedOption(product, action.payload)
            })
         }


      case 'UPDATE_QUANTITY':
         return {
            ...state,
            quantity: action.payload
         }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ProductBuyButtonReducer`)
      }
   }
}

export { ProductBuyButtonReducer }
