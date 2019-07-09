import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../../_state/context'
import { ProductBuyButtonContext } from '../../_state/context'

function ProductQuantityInput({ minQuantity, maxQuantity, isShopReady }) {
   const [productState] = useContext(ProductContext)
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const isFirstRender = useRef(true)
   const element = useRef()
   const [quantityValue, setQuantityValue] = useState(minQuantity)

   useEffect(
      function() {
         handleQuantityChange()
      },
      [productState.addedToCart]
   )

   function handleQuantityChange(event = false) {
      if (!event) {
         buyButtonDispatch({ type: 'UPDATE_QUANTITY', payload: Number(minQuantity) })
         setQuantityValue(minQuantity)
      } else {
         buyButtonDispatch({ type: 'UPDATE_QUANTITY', payload: Number(event.target.value) })
         setQuantityValue(event.target.value)
      }
   }

   return (
      <div className='wps-quantity-input wps-quantity-input-wrapper' data-wps-is-ready={isShopReady ? '1' : '0'}>
         <input
            ref={element}
            type='number'
            name='wps-product-quantity'
            className='wps-product-quantity wps-form-input'
            value={quantityValue}
            onChange={handleQuantityChange}
            min={minQuantity}
            max={maxQuantity ? maxQuantity : undefined}
         />
      </div>
   )
}

export { ProductQuantityInput }
