import update from 'immutability-helper'

function CollectionReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCTS': {
      if (!action.payload) {
        return {
          ...state,
        }
      }

      console.log('........ state.productOptions', state.products)
      console.log('........ action.payload', action.payload)

      var updatedPayload = update(state.products, { $push: action.payload })

      // var okoko = update(state.products, { $set: updatedPayload })

      // state.products = updatedPayload

      return {
        ...state,
        products: updatedPayload,
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
