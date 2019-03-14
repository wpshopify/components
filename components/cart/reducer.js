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

      case "SET_TOTAL_PRICE":

         return {
            ...state,
            totalPrice: action.payload
         }

      case "UPDATE_TOTAL_PRICE":

         const { currentTotalPrice, lineItemPrice, lineItemQuantity, oldLineItemPrice, oldLineItemQuantity } = action.payload;

         // console.log('currentTotalPrice', currentTotalPrice);
         // console.log('lineItemPrice', lineItemPrice);
         // console.log('lineItemQuantity', lineItemQuantity);
         // console.log('oldLineItemPrice', oldLineItemPrice);
         // console.log('oldLineItemQuantity', oldLineItemQuantity);

         // function multiPrice(price, quantity) {
         //    return Number(accounting.unformat(price)) * quantity;
         // }

         // var oldLineItemTotal = multiPrice(oldLineItemPrice, oldLineItemQuantity);
         // console.log('oldLineItemTotal', oldLineItemTotal);

         // var newLineItemTotal = multiPrice(lineItemPrice, lineItemQuantity);
         // console.log('newLineItemTotal', newLineItemTotal);

         // var tempTotal = (currentTotalPrice - oldLineItemTotal);
         // var newTempTotal = tempTotal + newLineItemTotal;

         // console.log('tempTotal', tempTotal);
         // console.log('currentTotalPrice', currentTotalPrice);

         return {
            ...state,
            totalPrice: Number(accounting.unformat(currentTotalPrice)) + 1
         }

      default:
         return state;

   }

}

export {
   CartReducer
}