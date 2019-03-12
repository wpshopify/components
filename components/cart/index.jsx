import React, { useState, useReducer, useContext, useEffect } from 'react';
// import { CartInitialState } from './initial-state';
// import { CartContext } from './context';
// import { ShopContext } from '../shop/context';
import { CartButton } from './cart-button';
import { CartBody } from './cart-body';
// import { buildInstances } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';

function Cart() {

   //   const { state, dispatch } = useContext(ShopContext);

   // const [state, dispatch] = useReducer(CartReducer, CartInitialState(props));

   // console.log('state', state);

   return (
      <>
         <CartButton />
         <CartBody />
      </>
   )

}

export {
   Cart
}
