import React, { useContext, useRef, useEffect, useState } from 'react'
import { CartContext } from '../../cart/_state/context'
import { ShopContext } from '../../shop/_state/context'

import { CartLineItemQuantity } from './quantity'
import { maybeformatPriceToCurrency } from '../../../common/pricing/formatting'
import { useAnime, stagger } from '../../../common/animations'
import { calcLineItemTotal, isAvailable } from '../../../common/products'
import { Notice } from '../../notice'

import find from 'lodash/find'

function getLineItemFromState(lineItem, lineItemsFromState) {
   return find(lineItemsFromState, { variantId: lineItem.id })
}

function CartLineItem({ lineItem, index }) {
   const [cartState] = useContext(CartContext)
   const [shopState, shopDispatch] = useContext(ShopContext)

   const [isUpdating] = useState(false)
   const animeStagger = useAnime(stagger)

   const [lineItemQuantity, setLineItemQuantity] = useState(0)
   const [lineItemTotal, setLineItemTotal] = useState(0)

   const variantId = useRef(false)
   const lineItemElement = useRef()
   const isFirstRender = useRef(true)
   const lineItemTotalElement = useRef()

   function removeLineItem(e) {
      shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current })

      shopDispatch({
         type: 'UPDATE_LINE_ITEM_QUANTITY',
         payload: {
            variantId: variantId.current,
            lineItemNewQuantity: 0
         }
      })

      shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
   }

   useEffect(() => {
      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems)

      variantId.current = lineItemFoumd.variantId

      setLineItemQuantity(lineItemFoumd.quantity)
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFoumd.quantity))
   }, [shopState.checkoutCache.lineItems])

   useEffect(() => {
      if (cartState.cartOpen) {
         // stagger(lineItemElement.current, index);
         animeStagger(lineItemElement.current, index)
      }
   }, [cartState.cartOpen])

   return (
      <div className='wps-cart-lineitem wps-mr-0 wps-ml-0 wps-row' data-wps-is-updating={isUpdating} data-wps-is-available={isAvailable(lineItem)} ref={lineItemElement}>
         <a href='https://demo.wpshop.io/products/aerodynamic-aluminum-bench/' className='wps-cart-lineitem-img-link' target='_blank'>
            <div className='wps-cart-lineitem-img' style={{ backgroundImage: `url(${lineItem.image.src})` }} data-wps-is-ready={shopState.isShopReady} />
         </a>

         <div className='wps-cart-lineitem-content'>
            <div className='wps-cart-lineitem-title wps-col-12 wps-p-0' data-wps-is-ready={shopState.isShopReady}>
               <div className='wps-container-fluid wps-p-0'>
                  <div className='wps-row'>
                     <span className='wps-cart-lineitem-title-content wps-col-9'>{lineItem.productTitle}</span>
                     <span className='wps-cart-lineitem-remove wps-col-3' onClick={removeLineItem}>
                        Remove
                     </span>
                  </div>
               </div>
            </div>

            <div className='wps-cart-lineitem-variant-title wps-badge wps-badge-pill wps-badge-dark wps-col-12' data-wps-is-ready={shopState.isShopReady}>
               {lineItem.title}
            </div>

            {!isAvailable(lineItem) ? (
               <Notice type='warning' message='Out of stock' />
            ) : (
               <div className='wps-container-fluid wps-p-0'>
                  <div className='wps-row'>
                     <div className='wps-col-6'>
                        <CartLineItemQuantity
                           lineItem={lineItem}
                           variantId={variantId}
                           lineItemQuantity={lineItemQuantity}
                           setLineItemQuantity={setLineItemQuantity}
                           isReady={shopState.isShopReady}
                           isFirstRender={isFirstRender}
                           setLineItemTotal={setLineItemTotal}
                           lineItemTotalElement={lineItemTotalElement}
                        />
                     </div>

                     <div className='wps-col-6'>
                        <div className='wps-cart-lineitem-price wps-cart-lineitem-price-total' data-wps-is-ready={shopState.isShopReady} ref={lineItemTotalElement}>
                           {maybeformatPriceToCurrency(lineItemTotal)}
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export { CartLineItem }
