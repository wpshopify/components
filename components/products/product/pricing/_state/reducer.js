function ProductPricingReducer(state, action) {
   switch (action.type) {
      case 'SET_PRICES': {
         return {
            ...state,
            prices: action.payload
         }
      }

      default: {
         return state
      }
   }
}

export { ProductPricingReducer }
