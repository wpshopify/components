import React, { useEffect, useRef, useContext } from 'react'
import { CartButtons } from './buttons'
import { CartBody } from './body'
import { CartProvider } from './_state/provider'
import { useCustomEvent } from '../../common/hooks'
import { ShopContext } from '../shop/_state/context'

function Cart({ options }) {
   const [shopState, shopDispatch] = useContext(ShopContext)
   const updateCheckoutAttributes = useCustomEvent('wpshopify-update-checkout-attributes')
   const setCheckoutAttributes = useCustomEvent('wpshopify-set-checkout-attributes')
   const setCheckoutNote = useCustomEvent('wpshopify-set-checkout-note')
   const isFirstRender = useRef(true)

   function isShowingCart() {
      return shopState.settings.cart.cartLoaded
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      shopDispatch({ type: 'UPDATE_CHECKOUT_ATTRIBUTES', payload: updateCheckoutAttributes })
   }, [updateCheckoutAttributes])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      shopDispatch({ type: 'SET_CHECKOUT_ATTRIBUTES', payload: setCheckoutAttributes })
   }, [setCheckoutAttributes])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      shopDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNote })
   }, [setCheckoutNote])

   return (
      isShowingCart() && (
         <CartProvider options={options}>
            <CartButtons />
            <CartBody />
         </CartProvider>
      )
   )
}

export { Cart }
