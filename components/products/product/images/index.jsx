import React, { useContext } from 'react'
import { ProductGalleryWrapper } from './gallery/wrapper'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

function ProductImages() {
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <>
         <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
            <ProductGalleryWrapper productState={productState} />
         </div>
      </>,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductGallery)
   )
}

export default ProductImages
