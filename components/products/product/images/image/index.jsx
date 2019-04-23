import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductGalleryContext } from '../gallery/_state/context'
import { addCustomSizingToImageUrl } from '../../../../../common/images'

function ProductImage({ image, isFeatured }) {
   const imageRef = useRef()
   const [shopState] = useContext(ShopContext)
   const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)

   const imageOptimized = addCustomSizingToImageUrl({
      src: image.src,
      width: shopState.settings.productsImagesSizingWidth,
      height: shopState.settings.productsImagesSizingHeight,
      crop: shopState.settings.productsImagesSizingCrop,
      scale: shopState.settings.productsImagesSizingScale
   })

   useEffect(() => {
      if (isFeatured) {
         galleryDispatch({ type: 'SET_FEAT_IMAGE_ELEMENT', payload: imageRef.current })
      }
   }, [])

   return <img ref={imageRef} itemProp='image' src={imageOptimized} className='wps-product-image' alt={image.altText} data-wps-is-ready={shopState.isShopReady ? '1' : '0'} data-zoom={image.src} />
}

export { ProductImage }
