import React, { useContext, useRef, useEffect, useState } from 'react';
import { CartTitle } from '../title';
import { CartClose } from '../close';
import { useOnClickOutside } from '../../../common/hooks';
import { CartHeader } from '../header';
import { CartContents } from '../contents';
import { CartFooter } from '../footer';

import { CartContext } from '../context';
import { ShopContext } from '../../shop/context';

import { slideInRight, slideOutRight } from '../../../common/animations';



function CartBody() {

   const cart = useRef();
   const isFirstRender = useRef(true);

   // const [isCartOpen, setIsCartOpen] = useState(false);


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
         slideOutRight(cartElement);
      }

   }

   function openCart(cartElement) {

      if (openingCart(cartState)) {
         slideInRight(cartElement);
      }

   }


   useOnClickOutside(cart, (e) => {

      slideOutRight(cart.current);
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