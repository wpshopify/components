import React, { useContext, useRef, useEffect } from 'react'
// import { CartHeader } from '../header'
// import { CartContents } from '../contents'
// import { CartFooter } from '../footer'
// import { CartButtons } from '../buttons'
import { CartContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { useAction } from '../../../common/hooks'
import { hasHooks } from '../../../common/utils'
import { findTotalCartQuantities } from '../../../common/cart'
import isEmpty from 'lodash/isEmpty'
import { getProductsFromLineItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

const CartHeader = React.lazy(() => import(/* webpackChunkName: 'CartHeader' */ '../header'))
const CartContents = React.lazy(() => import(/* webpackChunkName: 'CartContents' */ '../contents'))
const CartFooter = React.lazy(() => import(/* webpackChunkName: 'CartFooter' */ '../footer'))
const CartButtons = React.lazy(() => import(/* webpackChunkName: 'CartButtons' */ '../buttons'))

function CartWrapper() {
   const [cartState, cartDispatch] = useContext(CartContext)
   const [shopState, shopDispatch] = useContext(ShopContext)
   const cart = useRef()
   const isFirstRender = useRef(true)
   const updateCheckoutAttributes = useAction('update.checkout.attributes')
   const setCheckoutAttributes = useAction('set.checkout.attributes')
   const setCheckoutNotes = useAction('set.checkout.note')
   const lineItemsAdded = useAction('product.addToCart')
   const openCart = useAction('cart.toggle')
   // const manualLineItems = useAction('checkout.add.lineItems')

   async function cartBootstrap() {
      if (!shopState.checkoutId) {
         return
      }

      let [productsError, products] = await to(getProductsFromLineItems())

      if (productsError) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: productsError
            }
         })
      }

      cartDispatch({ type: 'SET_CHECKOUT_CACHE', payload: { checkoutId: shopState.checkoutId } })

      cartDispatch({
         type: 'SET_LINE_ITEMS_AND_VARIANTS',
         payload: {
            lineItems: { products: products },
            checkoutId: shopState.checkoutId
         }
      })

      if (isEmpty(products)) {
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
      cartDispatch({ type: 'SET_TOTAL_LINE_ITEMS', payload: findTotalCartQuantities(cartState.checkoutCache.lineItems) })
   }, [cartState.isReady, cartState.checkoutCache.lineItems])

   useEffect(() => {
      hasHooks() && wp.hooks.doAction('on.checkout.update', cartState)
   }, [cartState.totalLineItems])

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
      if (openCart) {
         cartDispatch({ type: 'TOGGLE_CART', payload: true })
      }
   }, [openCart])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (lineItemsAdded) {
         cartDispatch({ type: 'UPDATE_LINE_ITEMS_AND_VARIANTS', payload: lineItemsAdded })
         cartDispatch({ type: 'TOGGLE_CART', payload: true })
      }

      if (isEmpty(lineItemsAdded)) {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      } else {
         cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      }
   }, [lineItemsAdded])

   return (
      <section ref={cart} className='wps-cart'>
         <CartButtons />
         <CartHeader />
         <CartContents isCartEmpty={cartState.isCartEmpty} checkoutCache={cartState.checkoutCache} />
         <CartFooter />
      </section>
   )
}

export default CartWrapper
