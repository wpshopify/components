import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../context'
import { usePortal } from '../../../../common/hooks'

function ProductDescription() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)
   console.log('productState.product', productState.product)

   return usePortal(
      <div itemProp='description' className='wps-products-description' data-wps-is-ready={shopState.isReady ? '1' : '0'} dangerouslySetInnerHTML={{ __html: productState.product.descriptionHtml }}>
         {/* <p>
            Created: {new Date(productState.product.createdAt).toDateString()} at {new Date(productState.product.createdAt).toLocaleTimeString('en-US')}
         </p>
         <p>
            Updated: {new Date(productState.product.updatedAt).toDateString()} at {new Date(productState.product.updatedAt).toLocaleTimeString('en-US')}
         </p> */}
      </div>,
      productState
   )
}

export { ProductDescription }
