import React, { useContext, useRef } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'
import { CartCheckout } from '../checkout'
import { CartNote } from '../note'
import { CartTerms } from '../terms'
import { Notices } from '../../notices'
import { CartFooterTotal } from './total'
import isEmpty from 'lodash/isEmpty'

function CartFooter() {
   const [shopState] = useContext(ShopContext)
   const [cartState] = useContext(CartContext)
   const totalElement = useRef()

   return (
      <>
         <section className='wps-cart-footer'>
            {shopState.settings.cart.enableCartNotes && <CartNote />}
            {shopState.settings.cart.enableCartTerms && <CartTerms />}
            {!isEmpty(cartState.notices) && <Notices notices={cartState.notices} noticeGroup='cart' />}
            <CartFooterTotal isReady={shopState.isCartReady} currencyCode={shopState.info.currencyCode} totalElement={totalElement} />
            <CartCheckout />
         </section>
      </>
   )
}

export default CartFooter
