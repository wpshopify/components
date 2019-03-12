import React, { useContext } from 'react';
import { CartContext } from '../cart/context';

function CartTitle() {

   const { state } = useContext(CartContext);

   return (
      <h2 className="wps-cart-title">{state.title}</h2>
   )

}

export {
   CartTitle
}