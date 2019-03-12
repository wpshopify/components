function ShopReducer(state, action) {

   switch (action.type) {

      case "OPEN_CART":

         return {
            ...state,
            cartOpen: true
         }

      case "CLOSE_CART":

         return {
            ...state,
            cartOpen: false
         }

      case "SET_CHECKOUT":

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