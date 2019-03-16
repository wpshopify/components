import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../../shop/context';
import { CartContext } from '../../cart/context';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';
import { pulse, useAnime } from '../../../common/animations';
import { CartButtonCheckout } from '../button-checkout';


function CartFooter() {

   const { shopState } = useContext(ShopContext);
   const totalElement = useRef();

   const animate = useAnime(pulse);


   useEffect(() => {

      animate(totalElement.current);

   }, [shopState.checkoutCache.total]);


   return (
      <section className="wps-cart-footer">

         <div className="wps-baseline wps-row wps-space-between">
            <p className="wps-total-prefix">Subtotal:</p>
            <p className="wps-total-amount" ref={totalElement} data-wps-is-ready={shopState.isReady}>{maybeformatPriceToCurrency(shopState.checkoutCache.total)}</p>
         </div>

         <CartButtonCheckout />

      </section>
   )

}

export {
   CartFooter
}