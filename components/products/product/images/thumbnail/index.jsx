import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductImage } from '../image'
import { ProductGalleryContext } from '../gallery/_state/context'

const ProductThumbnailImage = React.memo(function ProductThumbnailImage({ image }) {
   const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
   const [isActive, setIsActive] = useState(false)

   useEffect(
      function() {
         if (!checkIsActive(galleryState.featImage.src)) {
            setIsActive(false)
         } else {
            setIsActive(true)
         }
      },
      [galleryState.featImage]
   )

   function checkIsActive(featImageSrc) {
      return featImageSrc === image.src
   }

   function handleThumbnailClick() {
      galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: image })
   }

   return (
      <div className='wps-component wps-component-products-images-thumbnail' onClick={handleThumbnailClick} data-wps-is-active={isActive}>
         <ProductImage isFeatured={false} image={image} />
      </div>
   )
})

export { ProductThumbnailImage }
