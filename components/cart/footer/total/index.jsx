import React, { useEffect } from 'react'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { pulse, useAnime } from '../../../../common/animations'

function CartFooterTotal({ isShopReady, total, totalElement, currencyCode }) {
   const animate = useAnime(pulse)

   useEffect(() => {
      if (!isShopReady) {
         return
      }

      animate(totalElement.current)
   }, [total])

   return (
      <div className='baseline row align-items-end justify-content-between m-0'>
         <p className='wps-total-prefix p-0'>Subtotal:</p>
         <p className='wps-total-amount col p-0' ref={totalElement} data-wps-is-ready={isShopReady}>
            {isShopReady && formatPriceToCurrency(total, currencyCode)}
         </p>
      </div>
   )
}

export { CartFooterTotal }
