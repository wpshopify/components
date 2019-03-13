import React, { useContext, useRef, useEffect } from 'react';
import { CartTitle } from '../title';
import { CartClose } from '../close';

import { CartHeader } from '../header';
import { CartContents } from '../contents';
import { CartFooter } from '../footer';

import { CartContext } from '../context';
import { slideInRight, slideOutRight } from '../../../common/animations';

function CartBody() {

   const cart = useRef();
   const isFirstRender = useRef(true);
   const { cartState } = useContext(CartContext);

   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (cartState.cartOpen) {
         slideInRight(cart.current);

      } else {
         slideOutRight(cart.current);
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