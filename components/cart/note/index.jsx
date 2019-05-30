import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../../shop/_state/context'
// import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting'
// import { pulse, useAnime } from '../../../common/animations'
// import { CartCheckout } from '../checkout'

function CartNote() {
   const [shopState] = useContext(ShopContext)
   // const totalElement = useRef()

   // const animate = useAnime(pulse)

   // useEffect(() => {
   //    if (!shopState.isShopReady) {
   //       return
   //    }

   //    animate(totalElement.current)
   // }, [shopState.checkoutCache.total])

   return (
      <section className='wps-cart-notes'>
         <label value='Checkout notes' htmlFor='wps-input-notes'>
            Notes:
         </label>
         <textarea placeholder={shopState.settings.cart.cartNotesPlaceholder} id='wps-input-notes' className='wps-input wps-input-textarea' />
      </section>
   )
}

export { CartNote }
