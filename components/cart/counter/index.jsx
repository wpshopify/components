import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../shop/context';


function CartCounter() {

   const { shopState } = useContext(ShopContext);
   const [totalItems, setTotalItems] = useState(shopState.checkoutCache.lineItems.length);


   function isEmptyTotal(total) {
      return total === 0;
   }


   useEffect(() => {

      const total = shopState.checkoutCache.lineItems.length;

      if (!isEmptyTotal(total)) {
         setTotalItems(total);
      }

   }, [shopState.checkoutCache.lineItems]);


   return (
      <>
         {
            !isEmptyTotal(totalItems)
               ? <span className="wps-cart-counter">{totalItems}</span>
               : ''
         }
      </>
   )

}

export {
   CartCounter
}