import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductThumbnailImage } from '../thumbnail'
import { ProductContext } from '../../context'

function ProductThumbnailImages() {
   const { productState } = useContext(ProductContext)

   return (
      <div className='wps-thumbnails-wrapper'>
         {productState.product.images.map(image => (
            <ProductThumbnailImage key={image.id} image={image} />
         ))}
      </div>
   )
}

export { ProductThumbnailImages }
