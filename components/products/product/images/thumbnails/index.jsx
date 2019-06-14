import React, { useContext } from 'react'
import { ProductThumbnailImage } from '../thumbnail'
import { ProductContext } from '../../_state/context'
import uuidv4 from 'uuid/v4'
import isEmpty from 'lodash/isEmpty'

function ProductThumbnailImages() {
   const [productState] = useContext(ProductContext)

   function hasImages() {
      return productState.payload && !isEmpty(productState.payload.images)
   }

   return (
      hasImages() && (
         <div className='wps-thumbnails-wrapper row'>
            {productState.payload.images.map(image => (
               <ProductThumbnailImage key={uuidv4()} image={image} />
            ))}
         </div>
      )
   )
}

export { ProductThumbnailImages }
