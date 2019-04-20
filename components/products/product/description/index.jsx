import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function ProductDescription() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)

   return usePortal(
      <div itemProp='description' className='wps-products-description' data-wps-is-ready={shopState.isShopReady ? '1' : '0'} dangerouslySetInnerHTML={{ __html: productState.payload.descriptionHtml }}>
         {/* <p>
            Created: {new Date(productState.payload.createdAt).toDateString()} at {new Date(productState.payload.createdAt).toLocaleTimeString('en-US')}
         </p>
         <p>
            Updated: {new Date(productState.payload.updatedAt).toDateString()} at {new Date(productState.payload.updatedAt).toLocaleTimeString('en-US')}
         </p> */}
      </div>,
      productState.element
   )
}

export { ProductDescription }
