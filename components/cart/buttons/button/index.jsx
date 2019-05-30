import React, { useContext, useRef, useEffect } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartButtonProvider } from './_state/provider'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'
import { isCartEmpty } from '../../../../common/cart'

function CartButton({ options }) {
   const [shopState, shopDispatch] = useContext(ShopContext)
   const counterElement = useRef()
   const isFirstRender = useRef(true)
   const animeSlideInRight = useAnime(slideInRight)

   function toggleCart() {
      if (shopState.cartOpen) {
         console.log('<CartButton> - closeCart')
         shopDispatch({ type: 'CLOSE_CART' })
      } else {
         console.log('<CartButton> - OPEN_CART')
         shopDispatch({ type: 'OPEN_CART' })
      }
   }

   useEffect(() => {
      if (!shopState.isShopReady) {
         return
      }

      if (options.componentOptions.type === 'fixed') {
         console.log('HI1111')

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
