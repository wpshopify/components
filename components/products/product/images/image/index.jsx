import { ProductContext } from '../../_state/context'
import { ProductGalleryContext } from '../gallery/_state/context'
import { doFeaturedSizing, doThumbnailSizing } from '../../../../../common/images'
import Img from './img'
import { Link } from '../../../../link'
import { hasLink } from '../../../../../common/settings'

function ProductImage({ image, isFeatured, payloadSettings }) {
  const { useEffect, useContext, useRef, useState } = wp.element
  const imageRef = useRef()
  const [productState] = useContext(ProductContext)
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const [productImageSrc, setProductImageSrc] = useState(() => applyImageSizing())

  function applyImageSizing() {
    if (isFeatured) {
      if (wpshopify.settings.general.productsImagesSizingToggle) {
        return doFeaturedSizing(image.src)
      }

      return image.src
    } else {
      if (wpshopify.settings.general.productsThumbnailImagesSizingToggle) {
        return doThumbnailSizing(image.src)
      }
      return image.src
    }
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
  return hasLink(payloadSettings)
    ? productImageSrc && (
        <Link
          payload={productState.payload}
          type='products'
          linkTo={payloadSettings.linkTo}
          target={payloadSettings.linkTarget}>
          <Img
            imageRef={imageRef}
            image={image}
            productImageSrc={productImageSrc}
            galleryState={galleryState}
            isFeatured={isFeatured}
          />
        </Link>
      )
    : productImageSrc && (
        <Img
          imageRef={imageRef}
          image={image}
          productImageSrc={productImageSrc}
          galleryState={galleryState}
          isFeatured={isFeatured}
        />
      )
}

export default wp.element.memo(ProductImage)
