import React, { useContext, useRef, useEffect } from 'react';
import { CartTitle } from '../cart-title';
import { CartClose } from '../cart-close';

import { CartHeader } from '../cart-header';
import { CartContents } from '../cart-contents';
import { CartFooter } from '../cart-footer';

import { CartContext } from '../cart/context';
import { slideInRight, slideOutRight } from '../../common/animations';

function CartBody() {

   const cart = useRef();
   const isFirstRender = useRef(true);
   const { state } = useContext(CartContext);

   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      console.log('state.cartOpen', state.cartOpen);
      console.log('cart.current', cart.current);

      if (state.cartOpen) {
         slideInRight(cart.current);

      } else {
         slideOutRight(cart.current);
      }

   }, [state.cartOpen]);

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