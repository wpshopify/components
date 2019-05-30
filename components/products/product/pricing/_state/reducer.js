function ProductPricingReducer(state, action) {
   switch (action.type) {
      case 'SET_PRICES': {
         return {
            ...state,
            prices: action.payload
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ProductPricingReducer`)
      }
   }
}

export { ProductPricingReducer }
