import React, { useState, useReducer, useContext, useEffect } from 'react';
import { CartInitialState } from './initial-state';
import { ShopContext } from '../shop/context';
import { CartContext } from './context';
import { CartReducer } from './reducer';
import { CartButton } from './button';
import { CartBody } from './body';
import uniq from 'lodash/uniq';
import some from 'lodash/some';
import flattenDepth from 'lodash/flattenDepth';
import startsWith from 'lodash/startsWith';
import assign from 'lodash/assign';
import unionBy from 'lodash/unionBy';
import reduce from 'lodash/reduce';

import { getProducts } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { addProductDetailsToVariant } from '../../common/products';















function Cart(props) {

   const { shopState, shopDispatch } = useContext(ShopContext);
   const [state, dispatch] = useReducer(CartReducer, CartInitialState(shopState.checkout, props));


   useEffect(() => {

      dispatch({ type: "SET_TOTAL_PRICE", payload: shopState.checkout.totalPrice });

      console.log('<Cart /> useEffect shopState.checkout');

   }, [shopState.checkout]);




   // useEffect(() => {






   // }, [shopState.checkoutCache]);


   return (
      <>
         <CartContext.Provider value={{
            cartState: state,
            cartDispatch: dispatch
         }}>

            <CartButton />
            <CartBody />

         </CartContext.Provider>

      </>
   )

}

export {
   Cart
}
