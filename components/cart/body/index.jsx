import React, { useContext, useRef, useEffect } from 'react'
import { CartHeader } from '../header'
import { CartContents } from '../contents'
import { CartFooter } from '../footer'
import { CartContext } from '../_state/context'
import { useAction } from '../../../common/hooks'

function CartBody() {
   const [cartState, cartDispatch] = useContext(CartContext)
   const cart = useRef()
   const isFirstRender = useRef(true)
   const updateCheckoutAttributes = useAction('update.checkout.attributes')
   const setCheckoutAttributes = useAction('set.checkout.attributes')
   const setCheckoutNotes = useAction('set.checkout.note')

   useEffect(() => {
      /*
      
      Need to toggle flag here dpeending on LS line items 
      */
      // cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
   }, [])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      cartDispatch({ type: 'UPDATE_CHECKOUT_ATTRIBUTES', payload: updateCheckoutAttributes })
   }, [updateCheckoutAttributes])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      cartDispatch({ type: 'SET_CHECKOUT_ATTRIBUTES', payload: setCheckoutAttributes })
   }, [setCheckoutAttributes])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNotes })
   }, [setCheckoutNotes])

   return (
      <section ref={cart} className='wps-cart'>
         <CartHeader />
         <CartContents isCartEmpty={cartState.isCartEmpty} checkoutCache={cartState.checkoutCache} />
         <CartFooter />
      </section>
   )
}

export { CartBody }
