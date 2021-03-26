import update from 'immutability-helper';

function CollectionReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCTS': {
      if (!action.payload) {
        return {
          ...state,
        };
      }

      var updatedPayload = update(state.products, { $push: action.payload });
      var updatedProductOptions = update(state.productOptions[0].payload, {
        $push: action.payload,
      });

      var updatedProductOptionsFull = update(state.productOptions, {
        $apply: function (options) {
          return [
            {
              ...options[0],
              payload: updatedProductOptions,
            },
          ];
        },
      });

      return {
        ...state,
        products: updatedPayload,
        productOptions: updatedProductOptionsFull,
      };
    }

    case 'SET_PRODUCT_OPTIONS': {
      if (!action.payload) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        productOptions: update(state.productOptions, { $set: action.payload }),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in CollectionReducer`);
    }
  }
}

export { CollectionReducer };
