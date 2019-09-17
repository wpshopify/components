import React from 'react'
import { CartLineItems } from '../lineitems'
import { Notice } from '../../notice'

function CartContents(props) {
   return (
      <section className='wps-cart-contents' data-is-cart-empty={props.isCartEmpty}>
         {props.isCartEmpty ? <Notice type='info' message='Your cart is empty 🛒' /> : <CartLineItems lineItems={props.checkoutCache.variants} />}
      </section>
   )
}

export default CartContents
