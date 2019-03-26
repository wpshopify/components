import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../context'

function ProductDescription() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)

   return (
      <div className='wps-component wps-component-products-description' data-wps-is-component-wrapper data-wps-component-order='0'>
         <div itemProp='description' className='wps-products-description' data-wps-is-ready={shopState.isReady ? '1' : '0'}>
            <p>
               Created: {new Date(productState.product.createdAt).toDateString()} at {new Date(productState.product.createdAt).toLocaleTimeString('en-US')}
            </p>

            <p>
               Updated: {new Date(productState.product.updatedAt).toDateString()} at {new Date(productState.product.updatedAt).toLocaleTimeString('en-US')}
            </p>

            {productState.product.description}
         </div>
      </div>
   )
}

export { ProductDescription }
