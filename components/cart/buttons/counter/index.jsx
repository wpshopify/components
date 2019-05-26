import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartButtonContext } from '../button/_state/context'
import { findTotalCartQuantities, isTotalEmpty } from '../../../../common/cart'
import { useAnime, pulse } from '../../../../common/animations'

function counterStyles(cartButtonState) {
   return {
      backgroundColor: cartButtonState.componentOptions.counter_background_color,
      color: cartButtonState.componentOptions.counter_text_color
   }
}

function CartCounter() {
   const [shopState] = useContext(ShopContext)
   const [totalItems, setTotalItems] = useState(findTotalCartQuantities(shopState.checkoutCache.lineItems))
   const [cartButtonState] = useContext(CartButtonContext)
   const animePulse = useAnime(pulse)
   const element = useRef()

   useEffect(() => {
      const total = findTotalCartQuantities(shopState.checkoutCache.lineItems)

      if (!isTotalEmpty(total)) {
         setTotalItems(total)
         animePulse(element.current)
      }
   }, [shopState.checkoutCache.lineItems])

   return (
      <>
         <span style={counterStyles(cartButtonState)} className='wps-cart-counter' ref={element}>
            {totalItems}
         </span>
      </>
   )
}

export { CartCounter }
