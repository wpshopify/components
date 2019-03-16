import React, { useContext } from 'react';
import { CartContext } from '../context';

function CartTitle() {

   const { cartState } = useContext(CartContext);

   return (
      <>
         <h2 className="wps-cart-title">{cartState.title}</h2>
      </>
   )

}

export {
   CartTitle
}