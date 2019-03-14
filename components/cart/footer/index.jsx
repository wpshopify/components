import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../shop/context';
import { CartContext } from '../../cart/context';
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting';


function CartFooter() {

   const { shopState } = useContext(ShopContext);

   const { cartState } = useContext(CartContext);

   const [totalPrice, setTotalPrice] = useState(shopState.checkout.totalPrice);

   console.log('shopState.checkout.totalPrice', shopState.checkout.totalPrice);

   // When our in-memory version updates
   useEffect(() => {

      console.log('Total price changed! ', totalPrice);
      setTotalPrice(maybeformatPriceToCurrency(cartState.totalPrice));

   }, [cartState.totalPrice]);


   // When the real checkout price updates (line items added, etc)
   useEffect(() => {

      console.log('Total price changed! ', totalPrice);
      console.log('maybeformatPriceToCurrency(shopState.checkout.totalPrice) ', maybeformatPriceToCurrency(shopState.checkout.totalPrice));

      setTotalPrice(maybeformatPriceToCurrency(shopState.checkout.totalPrice));

   }, [shopState.checkout.totalPrice]);


   return (
      <section className="wps-cart-footer">
         Total: {totalPrice}
      </section>
   )

}

export {
   CartFooter
}