import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductImage } from '../image'
import { ProductGalleryContext } from '../gallery/_state/context'
import { ProductContext } from '../../_state/context'
import { ShopContext } from '../../../../shop/_state/context'

function ProductThumbnailImage({ image }) {
   const [shopState] = useContext(ShopContext)
   const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
   const [productState] = useContext(ProductContext)
   const isFirstRender = useRef(true)

   const [isActive, setIsActive] = useState(false)

   function checkIsActive(featImageSrc) {
      return featImageSrc === image.src
   }

   function handleThumbnailClick() {
      galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: image })
   }

   useEffect(() => {
      setIsActive(checkIsActive(galleryState.featImage.src))
   }, [galleryState.featImage])

   useEffect(() => {
      if (productState.selectedVariant) {
         galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: productState.selectedVariant.image })
         setIsActive(checkIsActive(productState.selectedVariant.image.src))
      }
   }, [productState.selectedVariant])

   return (
      <div className='wps-component wps-component-products-images-thumbnail wps-w-5 col' onClick={handleThumbnailClick} data-wps-is-active={isActive} data-wps-is-ready={shopState.isShopReady}>
         <ProductImage isFeatured={false} image={image} />
      </div>
   )
}

export { ProductThumbnailImage }
