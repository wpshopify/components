import React, { useState, useReducer, useContext } from 'react';
import { CartInitialState } from './initial-state';
import { CartContext } from './context';
import { CartReducer } from './reducer';
import { CartButton } from '../cart-button';
import { CartBody } from '../cart-body';


function Cart(props) {

   const [state, dispatch] = useReducer(CartReducer, CartInitialState(props));
   console.log('cart', state);

   return (
      <>
         <CartContext.Provider value={{
            state: state,
            dispatch: dispatch
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
