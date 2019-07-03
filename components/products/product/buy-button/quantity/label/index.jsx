import React from 'react'

function ProductQuantityLabel({ showQuantityLabel, isShopReady, label }) {
   return (
      showQuantityLabel && (
         <div className='wps-quantity-input wps-quantity-label-wrapper d-flex align-items-center' data-wps-is-ready={isShopReady ? '1' : '0'}>
            <label htmlFor='wps-product-quantity'>{label}</label>
         </div>
      )
   )
}

export { ProductQuantityLabel }
