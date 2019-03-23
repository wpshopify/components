import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductFeaturedImage } from './featured'
import { ProductGallery } from './gallery'
import { ProductContext } from '../context'

function ProductImages() {
   const { productState } = useContext(ProductContext)

   return (
      <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
         {productState.isFeaturedOnly ? <ProductFeaturedImage /> : <ProductGallery />}
      </div>
   )
}

export { ProductImages }
