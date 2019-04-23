import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function ProductTitle() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)

   return usePortal(
      <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
         <h2 itemProp='name' className='wps-products-title' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
            {productState.payload.title}
         </h2>
      </div>,
      productState.element
   )
}

export { ProductTitle }
