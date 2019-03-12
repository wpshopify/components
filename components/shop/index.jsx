import React, { useState, useReducer, useContext, useEffect } from 'react';
import { ShopInitialState } from './initial-state';
import { ShopContext } from './context';
import { ShopReducer } from './reducer';
import { Cart } from '../cart';

import { buildInstances } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';


function Shop(props) {

   const [state, dispatch] = useReducer(ShopReducer, ShopInitialState(props));

   console.log('state', state);


   async function getCheckout() {
      
      var instances = await buildInstances();

      console.log('new state', instances);

      dispatch({ type: "SET_CHECKOUT", payload: instances.checkout });

   }


   useEffect( () => {

      getCheckout();
      
   }, []);


   return (
      <>
         <ShopContext.Provider value={{
            state: state,
            dispatch: dispatch
         }}>

            <Cart />

         </ShopContext.Provider>
      </>
   )

}

export {
   Shop
}
