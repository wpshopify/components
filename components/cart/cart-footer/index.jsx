import React, { useContext, useEffect } from 'react';
import { CartTitle } from '../cart-title';
import { ShopContext } from '../../shop/context';

function CartFooter() {

   const { state } = useContext(ShopContext);

   // useEffect(() => {
   //    console.log('Total price changed! ', state.checkout.totalPrice);
   // }, [state.checkout.totalPrice]);

   return (
      <section className="wps-cart-footer">
         Total: {state.checkout.totalPrice}
      </section>
   )

}

export {
   CartFooter
}