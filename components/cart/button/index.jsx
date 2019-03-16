import React, { useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CartCounter } from '../counter';
import { CartIcon } from '../icon';
import { CartContext } from '../context';
import { useAnime, slideInRight } from '../../../common/animations';


function CartButton() {

   const { cartState, cartDispatch } = useContext(CartContext);
   const counterElement = useRef();
   const animeSlideInRight = useAnime(slideInRight);

   function openCart() {
      cartDispatch({ type: "OPEN_CART" });
   }

   useEffect(() => {

      animeSlideInRight(counterElement.current);

   }, []);

   return (
      <>
         {
            ReactDOM.createPortal(
               <button ref={counterElement} className="wps-btn-cart wps-cart-button-fixed" onClick={openCart}>
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