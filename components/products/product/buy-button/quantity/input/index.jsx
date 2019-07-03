import React from 'react'

function ProductQuantityInput({ minQuantity, maxQuantity, handleQuantityChange, isShopReady }) {
   return (
      <div className='wps-quantity-input wps-quantity-input-wrapper' data-wps-is-ready={isShopReady ? '1' : '0'}>
         <input
            type='number'
            name='wps-product-quantity'
            className='wps-product-quantity wps-form-input'
            defaultValue={minQuantity}
            onChange={handleQuantityChange}
            min={minQuantity}
            max={maxQuantity ? maxQuantity : undefined}
         />
      </div>
   )
}

export { ProductQuantityInput }
