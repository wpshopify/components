import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import { ProductGalleryContext } from '../gallery/_state/context'
import { addCustomSizingToImageUrl } from '../../../../../common/images'

import { Link } from '../../../../link'
import { hasSinglePage } from '../../../../../common/settings'
import { onSinglePage } from '../../../../../common/components'

function ProductImage({ image, isFeatured }) {
   const imageRef = useRef()
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)
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


   
   // const Image = React.forwardRef((props, ref) => (
      
   //    ));
   

   function isShowingLink() {
      return hasSinglePage() && !onSinglePage(itemsState) && !productState.hasManyImages
   }

   /*
   
   TODO: Fix duplication here. For some reason the Drift image zoom breaks if we move 
   the image tag into a resuable component. Probably something to do with ref forwarding.

   */
   return isShowingLink() ? (
      <Link payload={productState.payload} type='products' shop={shopState}>
         <img ref={imageRef} itemProp='image' src={imageOptimized} className='wps-product-image' alt={image.altText} data-wps-is-ready={shopState.isShopReady ? '1' : '0'} data-zoom={image.src} />
      </Link>
   ) : (
      <img ref={imageRef} itemProp='image' src={imageOptimized} className='wps-product-image' alt={image.altText} data-wps-is-ready={shopState.isShopReady ? '1' : '0'} data-zoom={image.src} />
   )
}

export { ProductImage }
