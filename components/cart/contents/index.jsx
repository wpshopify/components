import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartLineItems } from '../lineitems'
import { Notice } from '../../notice'

function CartContents() {
   const [shopState] = useContext(ShopContext)

   return (
      <section className='wps-cart-contents'>{shopState.isCartEmpty ? <Notice type='info' message='Your cart is empty 🛒' /> : <CartLineItems lineItems={shopState.checkoutCache.variants} />}</section>
   )
}

export { CartContents }
