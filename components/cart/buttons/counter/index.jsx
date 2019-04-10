import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../../shop/context'
import { CartButtonContext } from '../button/context'

function findTotalCartQuantities(lineItems) {
   return lineItems.reduce(function(accumulator, lineItem) {
      accumulator += lineItem.quantity
      return accumulator
   }, 0)
}

function isTotalEmpty(total) {
   return total === 0
}

function counterStyles(cartButtonState) {
   return {
      backgroundColor: cartButtonState.componentOptions.counter_background_color,
      color: cartButtonState.componentOptions.counter_text_color
   }
}

function CartCounter() {
   const { shopState } = useContext(ShopContext)
   const [totalItems, setTotalItems] = useState(findTotalCartQuantities(shopState.checkoutCache.lineItems))
   const { cartButtonState } = useContext(CartButtonContext)

   useEffect(() => {
      const total = findTotalCartQuantities(shopState.checkoutCache.lineItems)

      if (!isTotalEmpty(total)) {
         setTotalItems(total)
      }
   }, [shopState.checkoutCache.lineItems])

   return (
      <>
         {!isTotalEmpty(totalItems) ? (
            <span style={counterStyles(cartButtonState)} className='wps-cart-counter'>
               {totalItems}
            </span>
         ) : (
            ''
         )}
      </>
   )
}

export { CartCounter }
