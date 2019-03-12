import React, { useContext } from 'react';
import { ShopContext } from '../../shop/context';
import { CartTitle } from '../cart-title';
import { CartClose } from '../cart-close';

function CartHeader() {

   return (
      <section className="wps-cart-header">
         <CartTitle />
         <CartClose />
      </section>
   )

}

export {
   CartHeader
}