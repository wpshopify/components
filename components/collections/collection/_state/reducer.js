import update from 'immutability-helper'

function CollectionReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCTS': {
      if (!action.payload) {
        return {
          ...state,
        }
      }

      var updatedPayload = update(state.productOptions[0].payload, { $push: action.payload })

      var okoko = update(state.productOptions[0].payload, { $set: updatedPayload })

      state.productOptions[0].payload = updatedPayload

      return {
        ...state,
        productOptions: state.productOptions,
      }
    }

    case 'SET_PRODUCT_OPTIONS': {
      if (!action.payload) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        productOptions: update(state.productOptions, { $set: action.payload }),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in CollectionReducer`)
    }
  }
}

export { CollectionReducer }
