import React, { useContext } from 'react';
import { ShopContext } from '../../shop/context';

function CartTitle() {

   const { state } = useContext(ShopContext);

   return (
      <h2 className="wps-cart-title">{state.title}</h2>
   )

}

export {
   CartTitle
}