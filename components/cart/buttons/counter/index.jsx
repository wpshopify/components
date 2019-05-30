import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartButtonContext } from '../button/_state/context'
import { findTotalCartQuantities, isTotalEmpty } from '../../../../common/cart'
import { useAnime, pulse } from '../../../../common/animations'
import has from 'lodash/has'

function CartCounter() {
   const [shopState] = useContext(ShopContext)
   const [totalItems, setTotalItems] = useState(findTotalCartQuantities(shopState.checkoutCache.lineItems))
   const [cartButtonState] = useContext(CartButtonContext)
   const animePulse = useAnime(pulse)
   const element = useRef()

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      const total = findTotalCartQuantities(shopState.checkoutCache.lineItems)

      if (!isTotalEmpty(total)) {
         setTotalItems(total)
         animePulse(element.current)
      }
   }, [shopState.checkoutCache.lineItems])

   function counterStyles() {
      return {
         backgroundColor: getBackgroundColor(),
         color: getColor()
      }
   }

   function getColor() {
      if (cartButtonState.componentOptions.componentOptions.type === 'fixed') {
         return shopState.settings.cart.colorCartCounterFixed
      }

      return cartButtonState.componentOptions.counter_text_color
   }

   function getBackgroundColor() {
      if (has(cartButtonState.componentOptions, 'counterBackgroundColor')) {
         return cartButtonState.componentOptions.counterBackgroundColor
      }

      return shopState.settings.cart.colorCounter
   }
   console.log('counterStyles(cartButtonState)', counterStyles(cartButtonState))

   return (
      <>
         <span style={counterStyles(cartButtonState)} className='wps-cart-counter' ref={element}>
            {totalItems}
         </span>
      </>
   )
}

export { CartCounter }
