import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartLineItems } from '../lineitems'
import { CartNotice } from '../notice'
import { CartNoticeEmpty } from '../notice/empty'

function CartContents() {
   const [shopState] = useContext(ShopContext)

   return (
      <section className='wps-cart-contents'>
         {shopState.isCartEmpty ? (
            <CartNotice>
               <CartNoticeEmpty />
            </CartNotice>
         ) : (
            <CartLineItems lineItems={shopState.checkoutCache.variants} />
         )}
      </section>
   )
}

export { CartContents }
