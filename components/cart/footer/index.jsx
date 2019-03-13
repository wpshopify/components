import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../shop/context';

function CartFooter() {

   const { shopState } = useContext(ShopContext);

   useEffect(() => {
      console.log('Total price changed! ', shopState.checkout.totalPrice);
   }, [shopState.checkout]);

   return (
      <section className="wps-cart-footer">
         Total: {shopState.checkout.totalPrice}
      </section>
   )

}

export {
   CartFooter
}