import { filterAvailableVariantsBySelectedOption } from '../../../../../common/products'
import { updateNoticesState } from '../../../../../common/state'
import update from 'immutability-helper'

function ProductBuyButtonReducer(state, action) {
  switch (action.type) {
    case 'SET_ALL_SELECTED_OPTIONS':
      return {
        ...state,
        allOptionsSelected: update(state.allOptionsSelected, { $set: action.payload }),
      }

    case 'UNSET_SELECTED_OPTIONS':
      return {
        ...state,
        selectedOptions: update(state.selectedOptions, { $unset: [action.payload] }),
      }

    case 'UPDATE_SELECTED_OPTIONS':
      return {
        ...state,
        selectedOptions: update(state.selectedOptions, { $merge: action.payload }),
      }

    case 'REMOVE_SELECTED_OPTIONS':
      return {
        ...state,
        selectedOptions: update(state.selectedOptions, { $set: {} }),
      }

    case 'SET_MISSING_SELECTIONS':
      return {
        ...state,
        missingSelections: update(state.missingSelections, { $set: action.payload }),
      }

    case 'SET_AVAILABLE_VARIANTS':
      return {
        ...state,
        availableVariants: update(state.product, {
          $apply: (product) => filterAvailableVariantsBySelectedOption(product, action.payload),
        }),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        quantity: update(state.quantity, { $set: action.payload }),
      }

    case 'UPDATE_NOTICES':
      return {
        ...state,
        notices: updateNoticesState(state.notices, action.payload),
      }

    case 'SET_IS_CHECKING_OUT': {
      return {
        ...state,
        isCheckingOut: update(state.isCheckingOut, { $set: action.payload }),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ProductBuyButtonReducer`)
    }
  }
}

export { ProductBuyButtonReducer }
