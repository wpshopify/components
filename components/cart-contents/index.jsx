import React, { useContext } from 'react';
import { CartContext } from '../cart/context';

function CartContents() {

   const { state } = useContext(CartContext);

   console.log('state ', state);


   return (
      <section className="wps-cart-contents">
         Contents
      </section>
   )

}

export {
   CartContents
}