import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { CartCounter } from '../counter';
import { CartIcon } from '../icon';
import { CartContext } from '../context';

function CartButton() {

   const { cartState, cartDispatch } = useContext(CartContext);

   function openCart() {
      cartDispatch({ type: "OPEN_CART" });
   }

   return (
      <>
         {
            ReactDOM.createPortal(
               <button className="wps-btn-cart wps-cart-button-fixed" onClick={openCart}>
                  <CartCounter />
                  <CartIcon />
               </button>,
               document.getElementById(cartState.cartButtonDropzone)
            )
         }
      </>
   )

}

export {
   CartButton
}