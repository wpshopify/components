import React, { useState, useReducer, useContext, useEffect } from 'react';
import { CartInitialState } from './initial-state';
import { CartContext } from './context';
import { CartReducer } from './reducer';
import { CartButton } from './button';
import { CartBody } from './body';

function Cart(props) {

   const [state, dispatch] = useReducer(CartReducer, CartInitialState(props));

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
