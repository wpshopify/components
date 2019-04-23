import React, { useContext } from 'react'
import { ProductThumbnailImage } from '../thumbnail'
import { ProductContext } from '../../_state/context'
import uuidv4 from 'uuid/v4'

function ProductThumbnailImages() {
   const [productState] = useContext(ProductContext)

   return (
      <div className='wps-thumbnails-wrapper'>
         {productState.payload.images.map(image => (
            <ProductThumbnailImage key={uuidv4()} image={image} />
         ))}
      </div>
   )
}

export { ProductThumbnailImages }
