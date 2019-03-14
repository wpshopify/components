import React, { useContext } from 'react';
// import { ShopContext } from '../../shop/context';

function CartLineItemQuantity({ lineItem, lineItemQuantity, setLineItemQuantity, isReady }) {

   function handleQuantityChange() {
      console.log('handleQuantityChange');
   }

   function handleDecrement() {
      console.log('handleDecrement');
      setLineItemQuantity(lineItemQuantity - 1);
   }

   function handleIncrement() {
      console.log('handleIncrement');
      setLineItemQuantity(lineItemQuantity + 1);
   }

   return (

      <div className="wps-cart-lineitem-quantity-container" data-wps-is-ready={isReady}>

         <button className="wps-quantity-decrement" type="button" onClick={handleDecrement}>
            <span className="wps-quantity-icon wps-quantity-decrement-icon"></span>
         </button>

         <input className="wps-cart-lineitem-quantity" type="number" min="0" aria-label="Quantity" value="" onChange={handleQuantityChange} />

         <button className="wps-quantity-increment" type="button" onClick={handleIncrement}>
            <span className="wps-quantity-icon wps-quantity-increment-icon"></span>
         </button>

      </div>

   )

}

export {
   CartLineItemQuantity
}