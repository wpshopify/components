import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import find from 'lodash/find'
import { calcLineItemTotal } from '../../../../common/products'
import { useAnime, pulse } from '../../../../common/animations'

// 1 is the previous value before decrementing _again_
function isRemovingLineItem(quantity) {
   return Number(quantity) === 0
}

function getLineItemFromState(lineItem, lineItemsFromState) {
   return find(lineItemsFromState, { variantId: lineItem.id })
}

function CartLineItemQuantity({ lineItem, variantId, lineItemQuantity, setLineItemQuantity, isShopReady, isFirstRender, setLineItemTotal, lineItemTotalElement }) {
   const [shopState, shopDispatch] = useContext(ShopContext)
   const animePulse = useAnime(pulse)

   function changeQuantity(newQuantity) {
      let lineItemFoumd = getLineItemFromState(lineItem, shopState.checkoutCache.lineItems)

      if (lineItemFoumd && isFirstRender.current) {
         variantId.current = lineItemFoumd.variantId
      }

      animePulse(lineItemTotalElement.current)

      setLineItemQuantity(newQuantity)
      setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price))

      if (isRemovingLineItem(newQuantity)) {
         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current })
      }

      shopDispatch({
         type: 'UPDATE_LINE_ITEM_QUANTITY',
         payload: {
            variantId: variantId.current,
            lineItemNewQuantity: newQuantity
         }
      })

      shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
   }

   function handleQuantityChange(e) {
      setLineItemQuantity(e.target.value)
   }

   function handleQuantityBlur(e) {
      if (isRemovingLineItem(e.target.value)) {
         shopDispatch({ type: 'REMOVE_LINE_ITEM', payload: variantId.current })
      }

      shopDispatch({
         type: 'UPDATE_LINE_ITEM_QUANTITY',
         payload: {
            variantId: variantId.current,
            lineItemNewQuantity: Number(e.target.value)
         }
      })

      shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
   }

   /*

   Responsible for: decrementing line item quantity

   */
   function handleDecrement() {
      changeQuantity(lineItemQuantity - 1)
   }

   /*

   Responsible for: incrementing line item quantity

   */
   function handleIncrement() {
      changeQuantity(lineItemQuantity + 1)
   }

   return (
      <div className='wps-cart-lineitem-quantity-container wps-container-fluid' data-wps-is-ready={isShopReady}>
         <div className='wps-row'>
            <button className='wps-quantity-decrement wps-col-3' type='button' onClick={handleDecrement}>
               <span className='wps-quantity-icon wps-quantity-decrement-icon' />
            </button>

            <input className='wps-cart-lineitem-quantity' type='number' min='0' aria-label='Quantity' value={lineItemQuantity} onChange={handleQuantityChange} onBlur={handleQuantityBlur} />

            <button className='wps-quantity-increment wps-col-3' type='button' onClick={handleIncrement}>
               <span className='wps-quantity-icon wps-quantity-increment-icon' />
            </button>
         </div>
      </div>
   )
}

export { CartLineItemQuantity }
