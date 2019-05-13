import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting'
import { pulse, useAnime } from '../../../common/animations'
import { CartCheckout } from '../checkout'

function CartFooter() {
   const [shopState] = useContext(ShopContext)
   const totalElement = useRef()

   const animate = useAnime(pulse)

   useEffect(() => {
      animate(totalElement.current)
   }, [shopState.checkoutCache.total])

   return (
      <section className='wps-cart-footer'>
         <div className='baseline row align-items-end justify-content-between m-0'>
            <p className='wps-total-prefix col p-0'>Subtotal:</p>
            <p className='wps-total-amount col p-0' ref={totalElement} data-wps-is-ready={shopState.isShopReady}>
               {maybeformatPriceToCurrency(shopState.checkoutCache.total)}
            </p>
         </div>

         <CartCheckout />
      </section>
   )
}

export { CartFooter }
