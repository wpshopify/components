import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import { ProductGalleryContext } from '../gallery/_state/context'
import { addCustomSizingToImageUrl } from '../../../../../common/images'

import { Link } from '../../../../link'
import { hasSinglePage } from '../../../../../common/settings'
import { onSinglePage } from '../../../../../common/components'
import { SimpleImg } from 'react-simple-img'

function ProductImage({ image, isFeatured }) {
   const imageRef = useRef()
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)
   const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
   const [productImageSrc, setProductImageSrc] = useState(applyImageSizing())

   function doFeaturedSizing() {
      return addCustomSizingToImageUrl({
         src: image.src,
         width: shopState.settings.productsImagesSizingWidth,
         height: shopState.settings.productsImagesSizingHeight,
         crop: shopState.settings.productsImagesSizingCrop,
         scale: shopState.settings.productsImagesSizingScale
      })
   }

   function doThumbnailSizing() {
      return addCustomSizingToImageUrl({
         src: image.src,
         width: shopState.settings.productsThumbnailImagesSizingWidth,
         height: shopState.settings.productsThumbnailImagesSizingHeight,
         crop: shopState.settings.productsThumbnailImagesSizingCrop,
         scale: shopState.settings.productsThumbnailImagesSizingScale
      })
   }

   function applyImageSizing() {
      if (isFeatured) {
         if (shopState.settings.productsImagesSizingToggle) {
            return doFeaturedSizing()
         }

         return image.src
      } else {
         if (shopState.settings.productsThumbnailImagesSizingToggle) {
            return doThumbnailSizing()
         }
         return image.src
      }
   }

   function isShowingLink() {
      return itemsState.componentOptions.linkTo || (hasSinglePage() && !onSinglePage(itemsState) && isFeatured)
   }

   useEffect(() => {
      setProductImageSrc(applyImageSizing())

      if (isFeatured) {
         galleryDispatch({ type: 'SET_FEAT_IMAGE_ELEMENT', payload: imageRef.current })
      }
   }, [image])

   /*
   
   TODO: Fix duplication here. For some reason the Drift image zoom breaks if we move 
   the image tag into a resuable component. Probably something to do with ref forwarding.

   */
   return isShowingLink()
      ? productImageSrc && (
           <Link payload={productState.payload} type='products' shop={shopState} linkTo={itemsState.componentOptions.linkTo}>
              <Img imageRef={imageRef} image={image} productImageSrc={productImageSrc} shopState={shopState} />
           </Link>
        )
      : productImageSrc && <Img imageRef={imageRef} image={image} productImageSrc={productImageSrc} shopState={shopState} />
}

function Img(props) {
   return (
      <>
         <img
            ref={props.imageRef}
            itemProp='image'
            src={props.productImageSrc}
            className='wps-product-image lazyload'
            alt={props.image.altText}
            data-wps-is-ready={props.shopState.isShopReady ? '1' : '0'}
            data-zoom={props.image.src}
         />
      </>
   )
}

ProductImage = React.memo(ProductImage)

export { ProductImage }
