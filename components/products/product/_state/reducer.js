import update from 'immutability-helper'
import { findVariantFromSelectedOptions } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { filterAvailableVariantsBySelectedOption } from '../../../../common/products'
import { updateNoticesState } from '../../../../common/state'

function ProductReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_VARIANT': {
      if (!action.payload) {
        return {
          ...state,
          selectedVariant: false,
        }
      }

      return {
        ...state,
        selectedVariant: findVariantFromSelectedOptions(
          action.payload.payload,
          action.payload.selectedOptions
        ),
      }
    }

    case 'SET_HAS_MANY_IMAGES': {
      return {
        ...state,
        hasManyImages: update(state.hasManyImages, { $set: action.payload }),
      }
    }

    case 'SET_ADDED_VARIANT': {
      return {
        ...state,
        addedToCart: update(state.addedToCart, {
          $set: { variant: action.payload, at: new Date() },
        }),
      }
    }

    case 'SET_IS_TOUCHED': {
      return {
        ...state,
        isTouched: update(state.isTouched, {
          $set: action.payload,
        }),
      }
    }

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
        availableVariants: update(state.payload, {
          $apply: (payload) => filterAvailableVariantsBySelectedOption(payload, action.payload),
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
      throw new Error(`Unhandled action type: ${action.type} in ProductReducer`)
    }
  }
}

export { ProductReducer }
