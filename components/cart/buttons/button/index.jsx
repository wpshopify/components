import React, { useContext, useRef, useEffect, useState } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartContext } from '../../_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'

function CartButton({ options }) {
   const [shopState] = useContext(ShopContext)
   const [cartState, cartDispatch] = useContext(CartContext)
   const counterElement = useRef()
   const isFirstRender = useRef(true)
   const animeSlideInRight = useAnime(slideInRight)

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      if (options.componentOptions.type === 'fixed' && shopState.settings.cart.showFixedCartIcon) {
         animeSlideInRight(counterElement.current)
      }
   }, [shopState.isShopReady])

   function getIconColor() {
      if (options.componentOptions.type === 'fixed') {
         return shopState.settings.cart.colorCartBackgroundFixed
      }

      return ''
   }

   function iconStyles() {
      return {
         backgroundColor: getIconColor()
      }
   }

   function onClick() {
      cartDispatch({ type: 'TOGGLE_CART', payload: true })
   }

   return usePortal(
      <>
         <CartButtonProvider options={options}>
            <button
               data-is-cart-ready={shopState.isCartReady ? '1' : '0'}
               role='button'
               ref={counterElement}
               className={`wps-btn-cart wps-cart-icon-${options.componentOptions.type} ${isCartEmpty(cartState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''}`}
               onClick={onClick}
               style={iconStyles()}>
               {options.componentOptions.showCounter && <CartCounter />}

               <CartIcon />
            </button>
         </CartButtonProvider>
      </>,
      options.componentElement
   )
}

export { CartButton }
