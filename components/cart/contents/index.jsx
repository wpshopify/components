import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../../shop/context';
import { CartLineItems } from '../lineitems';
import { CartNotice } from '../notice';
import { CartNoticeEmpty } from '../notice/empty';

function CartContents() {

   const { shopState } = useContext(ShopContext);
   console.log('shopState.isCartEmpty', shopState.isCartEmpty);

   return (
      <section className="wps-cart-contents">

         {
            shopState.isCartEmpty
               ? <CartNoticeEmpty />
               : <CartLineItems lineItems={shopState.checkoutCache.variants} />
         }

      </section>
   )

}

export {
   CartContents
}