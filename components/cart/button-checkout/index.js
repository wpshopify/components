import React, { useContext } from 'react';
import { ShopContext } from '../../shop/context';

function CartButtonCheckout() {

   const { shopState } = useContext(ShopContext);

   function handleCheckout() {
      console.log('Clicked checkout button');
   }

   return (
      <>
         <button className="wps-btn wps-btn-checkout" onClick={handleCheckout} data-wps-is-ready={shopState.isReady}>Checkout</button>
      </>
   )

}

export {
   CartButtonCheckout
}