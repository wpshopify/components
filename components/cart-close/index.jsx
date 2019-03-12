import React, { useContext } from 'react';
import { CartContext } from '../cart/context';

function CartClose() {

   const { state, dispatch } = useContext(CartContext);

   function closeCart() {
      dispatch({ type: "CLOSE_CART" });
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