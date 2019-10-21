import React, { useContext } from 'react'
import { ProductThumbnailImage } from '../thumbnail'
import { ProductGalleryContext } from '../gallery/_state/context'
import uuidv4 from 'uuid/v4'
import isEmpty from 'lodash/isEmpty'

const ProductThumbnailImages = React.memo(function ProductThumbnailImages({ product }) {
   function hasImages() {
      return product && !isEmpty(product.images)
   }

   return (
      hasImages() && (
         <div className='wps-thumbnails-wrapper'>
            {product.images.map(image => (
               <ProductThumbnailImage key={uuidv4()} image={image} />
            ))}
         </div>
      )
   )
})

export { ProductThumbnailImages }
