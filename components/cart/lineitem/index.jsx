import React, { useContext, useRef, useEffect, useState } from 'react'
import { CartContext } from '../../cart/_state/context'
import { ShopContext } from '../../shop/_state/context'
import { Link } from '../../link'
import { CartLineItemQuantity } from './quantity'
import { formatPriceToCurrency } from '../../../common/pricing/formatting'
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
      let lineItemFound = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems)

      variantId.current = lineItemFound.variantId

      setLineItemQuantity(lineItemFound.quantity)
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFound.quantity))
   }, [shopState.checkoutCache.lineItems])

   function placeholderImageUrl() {
      return WP_Shopify.pluginsDirURL + 'public/imgs/placeholder.png'
   }

   function actualImageUrl() {
      return lineItem.image.src
   }

   function lineItemImage() {
      return lineItem.image ? { backgroundImage: `url(${actualImageUrl()})` } : { backgroundImage: `url(${placeholderImageUrl()})` }
   }

   return (
      <div className='wps-cart-lineitem mr-0 ml-0 row' data-wps-is-updating={isUpdating} data-wps-is-available={isAvailable(lineItem)} ref={lineItemElement}>
         <Link payload={lineItem} shop={shopState} type='products' classNames='wps-cart-lineitem-img-link' target='_blank'>
            <div className='wps-cart-lineitem-img' style={lineItemImage()} data-wps-is-ready={shopState.isShopReady} />
         </Link>

         {/* <a href={'test'} className='wps-cart-lineitem-img-link' target='_blank' /> */}

         <div className='wps-cart-lineitem-content'>
            <div className='wps-cart-lineitem-title col-12 p-0' data-wps-is-ready={shopState.isShopReady}>
               <div className='container-fluid p-0'>
                  <div className='row'>
                     <span className='wps-cart-lineitem-title-content col-9'>{lineItem.productTitle}</span>
                     <span className='wps-cart-lineitem-remove col-3' onClick={removeLineItem}>
                        Remove
                     </span>
                  </div>
               </div>
            </div>

            <div className='wps-cart-lineitem-variant-title badge badge-pill badge-dark col-12' data-wps-is-ready={shopState.isShopReady}>
               {lineItem.title}
            </div>

            {!isAvailable(lineItem) ? (
               <Notice type='warning' message='Out of stock' />
            ) : (
               <div className='container-fluid p-0'>
                  <div className='row'>
                     <div className='col-8'>
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

                     <div className='wps-cart-lineitem-price-total-wrapper'>
                        <div className='wps-cart-lineitem-price wps-cart-lineitem-price-total' data-wps-is-ready={shopState.isShopReady} ref={lineItemTotalElement}>
                           {shopState.isShopReady && formatPriceToCurrency(lineItemTotal, shopState.info.currencyCode)}
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
