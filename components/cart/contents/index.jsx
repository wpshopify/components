import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../../shop/context';
import { CartLineItems } from '../lineitems';

function CartContents() {

   const { shopState } = useContext(ShopContext);

   return (
      <section className="wps-cart-contents">
         <CartLineItems lineItems={shopState.checkoutCache.variants} />
      </section>
   )

}

export {
   CartContents
}