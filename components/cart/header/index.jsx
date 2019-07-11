import React from 'react'
import { CartTitle } from '../title'
import { CartClose } from '../close'
import { useAction } from '../../../common/hooks'

function CartHeader() {
   const isShowingTitle = useAction('show.cart.title', true)
   const isShowingClose = useAction('show.cart.close', true)

   return (
      <section className='wps-cart-header container-fluid'>
         <div className='row'>
            {isShowingTitle && <CartTitle />}
            {isShowingClose && <CartClose />}
         </div>
      </section>
   )
}

export default CartHeader
