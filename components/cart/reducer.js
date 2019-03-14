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

      case "UPDATE_TOTAL_PRICE":

         function multiPrice(price, quantity) {
            return Number(accounting.unformat(price)) * quantity;
         }

         const { currentTotalPrice, lineItemPrice, lineItemQuantity, oldLineItemPrice, oldLineItemQuantity } = action.payload;


         var oldLineItemTotal = multiPrice(oldLineItemPrice, oldLineItemQuantity);
         console.log('oldLineItemTotal', oldLineItemTotal);

         var newLineItemTotal = multiPrice(lineItemPrice, lineItemQuantity);
         console.log('newLineItemTotal', newLineItemTotal);

         var tempTotal = (currentTotalPrice - oldLineItemTotal);
         var newTempTotal = tempTotal + newLineItemTotal;

         console.log('tempTotal', tempTotal);
         console.log('newTempTotal', newTempTotal);

         return {
            ...state,
            totalPrice: newTempTotal
         }

      default:
         return state;

   }

}

export {
   CartReducer
}