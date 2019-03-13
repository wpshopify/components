import React, { useContext } from 'react';
import { ShopContext } from '../../shop/context';
import { CartLineItems } from '../lineitems';

function CartContents() {

   const { shopState } = useContext(ShopContext);
   console.log('<CartContents> lineItems ', shopState.checkout.lineItems);

   return (
      <section className="wps-cart-contents">
         <CartLineItems lineItems={shopState.checkout.lineItems} />
      </section>
   )

}

export {
   CartContents
}