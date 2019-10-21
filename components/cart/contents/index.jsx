import React from 'react'
import { CartLineItems } from '../lineitems'
import { Notice } from '../../notice'

function CartContents(props) {
   function filterEmptyLineItems(lineItems) {
      return lineItems.filter(Boolean)
   }

   return (
      <section className='wps-cart-contents' data-is-cart-empty={props.isCartEmpty} data-wps-is-ready={props.isCartReady ? '1' : '0'}>
         {props.isCartEmpty ? <Notice type='info' message='Your cart is empty 🛒' /> : <CartLineItems lineItems={filterEmptyLineItems(props.checkoutCache.variants)} />}
      </section>
   )
}

export default CartContents
