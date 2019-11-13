import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartContext } from '../../_state/context'
import { CartButtonContext } from '../button/_state/context'
import { Loader } from '../../../loader'
import { findTotalCartQuantities, isTotalEmpty } from '../../../../common/cart'
import { useAnime, pulse } from '../../../../common/animations'

function CartCounter() {
   const [cartState, cartDispatch] = useContext(CartContext)
   const [shopState] = useContext(ShopContext)
   const [totalItems, setTotalItems] = useState(findTotalCartQuantities(cartState.checkoutCache.lineItems))
   const [cartButtonState] = useContext(CartButtonContext)
   const animePulse = useAnime(pulse)
   const element = useRef()

   useEffect(() => {
      if (!shopState.isCartReady) {
         return
      }

      const total = findTotalCartQuantities(cartState.checkoutCache.lineItems)

      setTotalItems(total)
      animePulse(element.current)
   }, [shopState.isCartReady, cartState.totalLineItems])

   function counterStyles() {
      return {
         backgroundColor: getBackgroundColor(),
         color: getColor()
      }
   }

   function getColor() {
      if (!cartButtonState.componentOptions.counterTextColor) {
         if (cartButtonState.componentOptions.type !== 'fixed') {
            return '#000'
         }
      }

      if (cartButtonState.componentOptions.type !== 'fixed') {
         return cartButtonState.componentOptions.counterTextColor
      }

      return shopState.settings.cart.colorCartCounterFixed
   }

   function getBackgroundColor() {
      if (!cartButtonState.componentOptions.counterBackgroundColor) {
         if (cartButtonState.componentOptions.type !== 'fixed') {
            return shopState.settings.cart.colorCounter
         }
      }

      return cartButtonState.componentOptions.counterBackgroundColor
   }

   return (
      <>
         <span style={counterStyles(cartButtonState)} data-wps-is-big={totalItems > 9 ? true : false} className='wps-cart-counter' ref={element}>
            {!shopState.isCartReady ? <Loader isLoading={true} /> : totalItems}
         </span>
      </>
   )
}

export { CartCounter }
