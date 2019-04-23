import React, { useContext, useRef, useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { ShopContext } from '../../../shop/_state/context'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartContext } from '../../context'
import { useAnime, slideInRight } from '../../../../common/animations'
import { usePortal } from '../../../../common/hooks'

import { CartButtonReducer } from './reducer'
import { CartButtonContext } from './context'
import { getCartButtonInitialState } from './initial-state'

function CartButton({ options }) {
   const [shopState] = useContext(ShopContext)
   const { cartState, cartDispatch } = useContext(CartContext)
   const counterElement = useRef()
   const animeSlideInRight = useAnime(slideInRight)
   const [state, dispatch] = useReducer(CartButtonReducer, getCartButtonInitialState(options))

   function toggleCart() {
      if (cartState.isOpen) {
         cartDispatch({ type: 'CLOSE_CART' })
      } else {
         cartDispatch({ type: 'OPEN_CART' })
      }
   }

   useEffect(() => {
      if (state.componentOptions.type === 'fixed') {
         animeSlideInRight(counterElement.current)
      }
   }, [])

   return usePortal(
      <>
         <CartButtonContext.Provider
            value={{
               cartButtonState: state,
               cartButtonDispatch: dispatch
            }}>
            <button
               role='button'
               ref={counterElement}
               className={`wps-btn-cart wps-cart-icon-${state.componentOptions.type}`}
               onClick={toggleCart}
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
               <CartCounter />
               <CartIcon />
            </button>
         </CartButtonContext.Provider>
      </>,
      state.element
   )
}

export { CartButton }
