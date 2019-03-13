import React, { useContext } from 'react';

import { CartTitle } from '../title';
import { CartClose } from '../close';

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