import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductFeaturedImage } from './featured'
import { ProductGallery } from './gallery'
import { ProductContext } from '../context'
import { usePortal } from '../../../../common/hooks'

function ProductImages() {
   const { productState } = useContext(ProductContext)

   return usePortal(
      <>
         <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
            <ProductGallery />
         </div>
      </>,
      productState
   )
}

export { ProductImages }
