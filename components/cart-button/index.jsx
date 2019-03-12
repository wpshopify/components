import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { CartCounter } from '../cart-counter';
import { CartIcon } from '../cart-icon';
import { CartContext } from '../cart/context';

function CartButton() {

   const { state, dispatch } = useContext(CartContext);

   function openCart() {
      console.log('openCart');
      dispatch({ type: "OPEN_CART" });
   }

   return (
      <>
         {
            ReactDOM.createPortal(
               <button className="wps-btn-cart wps-cart-button-fixed" onClick={openCart}>
                  <CartCounter />
                  <CartIcon />
               </button>,
               document.getElementById(state.cartButtonDropzone)
            )
         }
      </>
   )

}

export {
   CartButton
}