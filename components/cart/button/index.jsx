import React, { useContext, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CartCounter } from '../counter'
import { CartIcon } from '../icon'
import { CartContext } from '../context'
import { useAnime, slideInRight } from '../../../common/animations'

function CartButton() {
   const { cartState, cartDispatch } = useContext(CartContext)
   const counterElement = useRef()
   const animeSlideInRight = useAnime(slideInRight)

   console.log('cartState ...', cartState)
   console.log('cartState.cartIcons ...', cartState.cartIcons)

   function openCart() {
      cartDispatch({ type: 'OPEN_CART' })
   }

   useEffect(() => {
      animeSlideInRight(counterElement.current)
   }, [])

   return (
      <>
         {ReactDOM.createPortal(
            <button role='button' ref={counterElement} className='wps-btn-cart wps-cart-button-fixed' onClick={openCart}>
               <CartCounter />
               <CartIcon />
            </button>,
            cartState.cartIcons
         )}
      </>
   )
}

export { CartButton }
