import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../../shop/context'

function findTotalCartQuantities(lineItems) {
   return lineItems.reduce(function(accumulator, lineItem) {
      accumulator += lineItem.quantity
      return accumulator
   }, 0)
}

function isTotalEmpty(total) {
   return total === 0
}

function CartCounter() {
   const { shopState } = useContext(ShopContext)
   const [totalItems, setTotalItems] = useState(findTotalCartQuantities(shopState.checkoutCache.lineItems))

   useEffect(() => {
      console.log('<CartCounter />')

      const total = findTotalCartQuantities(shopState.checkoutCache.lineItems)

      if (!isTotalEmpty(total)) {
         setTotalItems(total)
      }
   }, [shopState.checkoutCache.lineItems])

   return <>{!isTotalEmpty(totalItems) ? <span className='wps-cart-counter'>{totalItems}</span> : ''}</>
}

export { CartCounter }
