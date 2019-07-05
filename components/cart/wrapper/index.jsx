import React, { useContext, useRef, useEffect } from 'react'
import { CartHeader } from '../header'
import { CartContents } from '../contents'
import { CartFooter } from '../footer'
import { CartButtons } from '../buttons'
import { CartContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { useAction } from '../../../common/hooks'
import isEmpty from 'lodash/isEmpty'
import { getProductIdsFromLineItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function CartWrapper() {
   const [cartState, cartDispatch] = useContext(CartContext)
   const [shopState] = useContext(ShopContext)
   const cart = useRef()
   const isFirstRender = useRef(true)
   const updateCheckoutAttributes = useAction('update.checkout.attributes')
   const setCheckoutAttributes = useAction('set.checkout.attributes')
   const setCheckoutNotes = useAction('set.checkout.note')
   const lineItems = useAction('product.addToCart')

   async function cartBootstrap() {
      if (!shopState.checkoutId) {
         return
      }

      let [lineItemsError, lineItems] = await to(getProductIdsFromLineItems())

      if (lineItemsError) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: lineItemsError
            }
         })
      }

      cartDispatch({ type: 'SET_CHECKOUT_CACHE', payload: { checkoutId: shopState.checkoutId } })

      cartDispatch({
         type: 'SET_LINE_ITEMS_AND_VARIANTS',
         payload: {
            lineItems: { products: lineItems },
            checkoutId: shopState.checkoutId
         }
      })

      if (isEmpty(lineItems)) {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      } else {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      }

      cartDispatch({ type: 'SET_IS_CART_READY', payload: true })
   }

   useEffect(() => {
      cartBootstrap()
   }, [shopState.checkoutId])

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

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (lineItems) {
         cartDispatch({ type: 'UPDATE_LINE_ITEMS_AND_VARIANTS', payload: lineItems })
         cartDispatch({ type: 'TOGGLE_CART', payload: true })
      }

      if (isEmpty(lineItems)) {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      } else {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      }
   }, [lineItems])

   return (
      <section ref={cart} className='wps-cart'>
         <CartButtons />
         <CartHeader />
         <CartContents isCartEmpty={cartState.isCartEmpty} checkoutCache={cartState.checkoutCache} />
         <CartFooter />
      </section>
   )
}

export { CartWrapper }
