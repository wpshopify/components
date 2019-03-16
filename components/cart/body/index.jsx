import React, { useContext, useRef, useEffect, useState } from 'react';
import { CartTitle } from '../title';
import { CartClose } from '../close';
import { useOnClickOutside } from '../../../common/hooks';
import { CartHeader } from '../header';
import { CartContents } from '../contents';
import { CartFooter } from '../footer';

import { CartContext } from '../context';
import { ShopContext } from '../../shop/context';

import { useAnime, slideInRight, slideOutRight } from '../../../common/animations';



function CartBody() {

   const cart = useRef();
   const isFirstRender = useRef(true);

   const animeSlideInRight = useAnime(slideInRight);
   const animeSlideOutRight = useAnime(slideOutRight);

   const { cartState, cartDispatch } = useContext(CartContext);
   const { shopState, shopDispatch } = useContext(ShopContext);


   function openingCart(cartState) {
      return cartState.cartOpen === true;
   }

   function closingCart(cartState) {
      return cartState.cartOpen === false;
   }

   function closeCart(cartElement) {

      if (closingCart(cartState)) {
         animeSlideOutRight(cartElement);
      }

   }

   function openCart(cartElement) {

      if (openingCart(cartState)) {
         animeSlideInRight(cartElement);
      }

   }


   useOnClickOutside(cart, (e) => {

      animeSlideOutRight(cart.current);
      cartDispatch({ type: "CLOSE_CART" });

   }, cartState.cartOpen);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (shopState.notifyingCart) {
         cartDispatch({ type: "OPEN_CART" });
         shopDispatch({ type: "NOTIFY_CART", payload: false });
      }

   }, [shopState.notifyingCart]);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (openingCart(cartState)) {
         return openCart(cart.current);
      }

      if (closingCart(cartState)) {
         return closeCart(cart.current);
      }

   }, [cartState.cartOpen]);



   return (
      <section ref={cart} className="wps-cart">
         <CartHeader />
         <CartContents />
         <CartFooter />
      </section>
   )

}

export {
   CartBody
}