function ShopReducer(state, action) {

   switch (action.type) {

      case "SET_CHECKOUT":

         return {
            ...state,
            checkout: action.payload,
            totalPrice: action.payload.totalPrice
         }

      case "UPDATED_CHECKOUT":

         // action.payload === totalPrice
         console.log('UPDATED_CHECKOUT ', action.payload);

         return {
            ...state,
            checkout: action.payload
         }

      default:
         return state;

   }

}

export {
   ShopReducer
}