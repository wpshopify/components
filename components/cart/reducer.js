import accounting from 'accounting';

function CartReducer(state, action) {

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

      default:
         return state;

   }

}

export {
   CartReducer
}