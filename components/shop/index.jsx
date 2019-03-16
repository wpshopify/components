import React, { useReducer, useEffect } from 'react';
import { ShopInitialState } from './initial-state';
import { ShopContext } from './context';
import { ShopReducer } from './reducer';

import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import { buildInstances, getProducts, getCheckoutCache, getCheckoutID } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import to from 'await-to-js';


function variantsFromCache() {

   var cache = getCheckoutCache(getCheckoutID());

   if (!isEmpty(cache.variants)) {

      return cache.variants;
   }

   return [];

}

function getUniqueProductIdsFromVariants(variants) {
   return uniq(variants.map(lineItem => lineItem.productId));
}


async function getProductIdsFromLineItems() {

   const uniqueIds = getUniqueProductIdsFromVariants(variantsFromCache())

   if (isEmpty(uniqueIds)) {
      console.log('Cart is empty, returning ...');
      return new Promise(resolve => resolve(false));
   }

   console.log('Cart is NOT empty, flushing lineitems from Shopify');
   return await getProducts(uniqueIds);

}


function Shop(props) {

   const [state, dispatch] = useReducer(ShopReducer, ShopInitialState(props));


   async function bootstrapShop() {

      var [instancesError, instances] = await to(buildInstances());

      if (instancesError) {
         console.error('instancesError!', instancesError);
         return;
      }

      dispatch({ type: "SET_CHECKOUT", payload: instances.checkout });
      dispatch({ type: "SET_CHECKOUT_CACHE", payload: instances.checkout });


      var [productsError, products] = await to(getProductIdsFromLineItems());

      if (productsError) {
         console.error('productsError!', productsError);
         return;
      }


      if (products) {
         dispatch({ type: "SET_CHECKOUT_CACHE_LINE_ITEMS", payload: { products: products } });
         dispatch({ type: "SET_CHECKOUT_TOTAL" });
      }

      // App is ready to go
      dispatch({ type: "IS_READY" });

   }

   // Bootstrap app on mount only
   useEffect(() => {

      bootstrapShop();

   }, []);


   return (
      <>
         <ShopContext.Provider value={{
            shopState: state,
            shopDispatch: dispatch
         }}>

            {props.children}

         </ShopContext.Provider>
      </>
   )

}

export {
   Shop
}
