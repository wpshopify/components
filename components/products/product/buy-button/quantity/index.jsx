import React, { useContext } from 'react'
import { ProductBuyButtonContext } from '../_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductsContext } from '../../../_state/context'

function ProductQuantity() {
   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
   const [shopState] = useContext(ShopContext)
   const [productsState] = useContext(ProductsContext)

   const minQuantity = productsState.componentOptions.minQuantity
   const maxQuantity = productsState.componentOptions.maxQuantity
   const showQuantityLabel = productsState.componentOptions.showQuantityLabel
   const quantityLabel = productsState.componentOptions.quantityLabelText

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
