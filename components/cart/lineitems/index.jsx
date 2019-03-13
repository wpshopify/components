import React, { useContext } from 'react';
import { CartLineItem } from '../lineitem';

function CartLineItems({ lineItems }) {

   return (
      <>
         {lineItems.map(lineItem => <CartLineItem key={lineItem.id} lineItem={lineItem} />)}
      </>
   )

}

export {
   CartLineItems
}