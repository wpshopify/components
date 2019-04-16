import React, { useContext } from 'react'
import { ProductBuyButtonContext } from '../buy-button/context'
import { ShopContext } from '../../../shop/context'

function ProductQuantity() {
   const { buyButtonState, buyButtonDispatch } = useContext(ProductBuyButtonContext)
   const { shopState } = useContext(ShopContext)

   const minQuantity = buyButtonState.componentOptions.minQuantity
   const maxQuantity = buyButtonState.componentOptions.maxQuantity
   const showQuantityLabel = buyButtonState.componentOptions.showQuantityLabel
   const quantityLabel = buyButtonState.componentOptions.quantityLabelText

   function handleQuantityChange(e) {
      buyButtonDispatch({ type: 'UPDATE_QUANTITY', payload: Number(e.target.value) })
   }

   return (
      <div className='wps-component wps-component-products-quantity' data-wps-is-component-wrapper data-wps-product-id={buyButtonState.product.id} data-wps-post-id=''>
         <div className='wps-form-control wps-row wps-product-quantity-wrapper'>
            {showQuantityLabel && (
               <div className='wps-quantity-input wps-quantity-label-wrapper' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
                  <label htmlFor='wps-product-quantity'>{quantityLabel}</label>
               </div>
            )}

            <div className='wps-quantity-input wps-quantity-input-wrapper' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
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
         </div>
      </div>
   )
}

export { ProductQuantity }
