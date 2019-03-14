function ShopReducer(state, action) {

   switch (action.type) {

      case "SET_CHECKOUT":

         return {
            ...state,
            checkout: action.payload,
            totalPrice: action.payload.totalPrice
         }

      case "UPDATE_CHECKOUT":

         // action.payload === totalPrice
         console.log('UPDATE_CHECKOUT ', action.payload);

         return {
            ...state,
            checkout: action.payload
         }

      case "NOTIFY_CART":

         // action.payload === totalPrice
         console.log('NOTIFY_CART ', action.payload);

         return {
            ...state,
            notifyingCart: action.payload
         }

      default:
         return state;

   }

}

export {
   ShopReducer
}