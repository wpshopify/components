import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductBuyButtonContext } from '../_state/context'

import { ShopContext } from '../../../../shop/_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductQuantityLabel } from './label'
import { ProductQuantityInput } from './input'

function ProductQuantity() {
   const [buyButtonState] = useContext(ProductBuyButtonContext)

   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)

   return (
      <div className='wps-component wps-component-products-quantity' data-wps-is-component-wrapper data-wps-product-id={buyButtonState.product.id} data-wps-post-id=''>
         <div className='wps-form-control row wps-product-quantity-wrapper m-0'>
            <ProductQuantityLabel showQuantityLabel={itemsState.componentOptions.showQuantityLabel} isShopReady={shopState.isShopReady} label={itemsState.componentOptions.quantityLabelText} />

            <ProductQuantityInput minQuantity={itemsState.componentOptions.minQuantity} maxQuantity={itemsState.componentOptions.maxQuantity} isShopReady={shopState.isShopReady} />
         </div>
      </div>
   )
}

export { ProductQuantity }
