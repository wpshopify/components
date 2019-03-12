import React, { useContext } from 'react';
import { CartContext } from '../cart/context';
import { CartTitle } from '../cart-title';
import { CartClose } from '../cart-close';

function CartHeader() {

   const { state } = useContext(CartContext);

   return (
      <section className="wps-cart-header">
         <CartTitle />
         <CartClose />
      </section>
   )

}

export {
   CartHeader
}