import update from 'immutability-helper'

function ProductVariantButtonsReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_OPTIONS': {
      return {
        ...state,
        selectedOptions: update(state.selectedOptions, { $push: [action.payload] })
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ProductVariantButtonsReducer`)
    }
  }
}

export { ProductVariantButtonsReducer }
