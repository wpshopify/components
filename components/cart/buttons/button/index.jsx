import React, { useContext, useRef, useEffect } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartContext } from '../../_state/context'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'

function CartButton({ options }) {
   const [shopState] = useContext(ShopContext)
   const [cartState, cartDispatch] = useContext(CartContext)
   const counterElement = useRef()
   const animeSlideInRight = useAnime(slideInRight)

   function toggleCart() {
      if (cartState.cartOpen) {
         cartDispatch({ type: 'CLOSE_CART' })
      } else {
         cartDispatch({ type: 'OPEN_CART' })
      }
   }

   useEffect(() => {
      if (options.componentOptions.type === 'fixed') {
         animeSlideInRight(counterElement.current)
      }
   }, [])

   return usePortal(
      <>
         <CartButtonProvider options={options}>
            <button
               role='button'
               ref={counterElement}
               className={`wps-btn-cart wps-cart-icon-${options.componentOptions.type} ${isCartEmpty(shopState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''}`}
               onClick={toggleCart}
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
               <CartCounter />
               <CartIcon />
            </button>
         </CartButtonProvider>
      </>,
      options.componentElement
   )
}

export { CartButton }
