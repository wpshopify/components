import React, { useContext, useRef, useEffect } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'
import { useAction } from '../../../../common/hooks'

function CartButton({ options }) {
   const [shopState, shopDispatch] = useContext(ShopContext)
   const counterElement = useRef()
   const isFirstRender = useRef(true)
   const animeSlideInRight = useAnime(slideInRight)

   function toggleCart() {
      if (shopState.cartOpen) {
         shopDispatch({ type: 'CLOSE_CART' })
      } else {
         shopDispatch({ type: 'OPEN_CART' })
      }
   }

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      if (options.componentOptions.type === 'fixed') {
         animeSlideInRight(counterElement.current)
      }
   }, [])

   function getIconColor() {
      if (options.componentOptions.componentOptions.type === 'fixed') {
         return shopState.settings.cart.colorCartBackgroundFixed
      }

      return ''
   }

   function iconStyles() {
      return {
         backgroundColor: getIconColor()
      }
   }

   return usePortal(
      <>
         <CartButtonProvider options={options}>
            <button
               role='button'
               ref={counterElement}
               className={`wps-btn-cart wps-cart-icon-${options.componentOptions.type} ${isCartEmpty(shopState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''}`}
               onClick={toggleCart}
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
               style={iconStyles()}>
               <CartCounter />
               <CartIcon />
            </button>
         </CartButtonProvider>
      </>,
      options.componentElement
   )
}

export { CartButton }
