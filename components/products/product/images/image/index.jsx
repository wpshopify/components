import { ShopContext } from '../../../../shop/_state/context'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import { ProductGalleryContext } from '../gallery/_state/context'
import { addCustomSizingToImageUrl } from '../../../../../common/images'

import { Link } from '../../../../link'
import { hasSinglePage } from '../../../../../common/settings'
import { onSinglePage } from '../../../../../common/components'

const { useEffect, useContext, useRef, useState } = wp.element

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
      width: shopState.settings.general.productsImagesSizingWidth,
      height: shopState.settings.general.productsImagesSizingHeight,
      crop: shopState.settings.general.productsImagesSizingCrop,
      scale: shopState.settings.general.productsImagesSizingScale
    })
  }

  function doThumbnailSizing() {
    return addCustomSizingToImageUrl({
      src: image.src,
      width: shopState.settings.general.productsThumbnailImagesSizingWidth,
      height: shopState.settings.general.productsThumbnailImagesSizingHeight,
      crop: shopState.settings.general.productsThumbnailImagesSizingCrop,
      scale: shopState.settings.general.productsThumbnailImagesSizingScale
    })
  }

  function applyImageSizing() {
    if (isFeatured) {
      if (shopState.settings.general.productsImagesSizingToggle) {
        return doFeaturedSizing()
      }

      return image.src
    } else {
      if (shopState.settings.general.productsThumbnailImagesSizingToggle) {
        return doThumbnailSizing()
      }
      return image.src
    }
  }

  function isShowingLink() {
    return (
      itemsState.payloadSettings.linkTo ||
      (hasSinglePage() && !onSinglePage(itemsState) && isFeatured)
    )
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
        <Link
          payload={productState.payload}
          type='products'
          shop={shopState}
          linkTo={itemsState.payloadSettings.linkTo}>
          <Img
            imageRef={imageRef}
            image={image}
            productImageSrc={productImageSrc}
            shopState={shopState}
          />
        </Link>
      )
    : productImageSrc && (
        <Img
          imageRef={imageRef}
          image={image}
          productImageSrc={productImageSrc}
          shopState={shopState}
        />
      )
}

function Img(props) {
  return (
    <img
      ref={props.imageRef}
      itemProp='image'
      src={props.productImageSrc}
      className='wps-product-image lazyload'
      alt={props.image.altText}
      data-wps-is-ready={props.shopState.isShopReady ? '1' : '0'}
      data-zoom={props.image.src}
    />
  )
}

ProductImage = wp.element.memo(ProductImage)

export { ProductImage }
