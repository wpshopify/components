import React, { useContext } from 'react'
import { ProductGallery } from './gallery'
import { ProductContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function ProductImages() {
   const [productState] = useContext(ProductContext)

   return usePortal(
      <>
         <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
            <ProductGallery />
         </div>
      </>,
      productState.element
   )
}

export { ProductImages }
