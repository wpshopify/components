import React, { useContext } from 'react';
import { CartContext } from '../context';

function CartClose() {

   const { cartDispatch } = useContext(CartContext);

   function closeCart() {
      cartDispatch({ type: "CLOSE_CART" });
   }

   return (
      <button className="wps-btn-close wps-modal-close-trigger" title="Close Cart" onClick={closeCart}>
         <span className="wps-modal-close-trigger">×</span>
      </button>
   )

}

export {
   CartClose
}