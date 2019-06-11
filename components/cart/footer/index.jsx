import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'
import { formatPriceToCurrency } from '../../../common/pricing/formatting'
import { pulse, useAnime } from '../../../common/animations'
import { CartCheckout } from '../checkout'
import { CartNote } from '../note'
import { CartTerms } from '../terms'
import { Notices } from '../../notices'
import isEmpty from 'lodash/isEmpty'

function CartFooter() {
   const [shopState] = useContext(ShopContext)
   const [cartState] = useContext(CartContext)
   const totalElement = useRef()
   const animate = useAnime(pulse)

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      animate(totalElement.current)
   }, [shopState.checkoutCache.total])

   return (
      <section className='wps-cart-footer'>
         {shopState.settings.cart.enableCartNotes && <CartNote />}
         {shopState.settings.cart.enableCartTerms && <CartTerms />}
         {!isEmpty(cartState.notices) && <Notices notices={cartState.notices} noticeGroup='cart' />}

         <div className='baseline row align-items-end justify-content-between m-0'>
            <p className='wps-total-prefix p-0'>Subtotal:</p>
            <p className='wps-total-amount col p-0' ref={totalElement} data-wps-is-ready={shopState.isShopReady}>
               {shopState.isShopReady && formatPriceToCurrency(shopState.checkoutCache.total, shopState.info.currencyCode)}
            </p>
         </div>
         <CartCheckout />
      </section>
   )
}

export { CartFooter }
