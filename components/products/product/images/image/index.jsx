import { ShopContext } from '../../../../shop/_state/context'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import { ProductGalleryContext } from '../gallery/_state/context'
import { doFeaturedSizing, doThumbnailSizing } from '../../../../../common/images'

import { Link } from '../../../../link'
import { hasLink } from '../../../../../common/settings'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useEffect, useContext, useRef, useState } = wp.element

function ProductImage({ image, isFeatured }) {
  const imageRef = useRef()
  const [itemsState] = useContext(ItemsContext)
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
  return hasLink(itemsState)
    ? productImageSrc && (
        <Link
          payload={productState.payload}
          type='products'
          linkTo={itemsState.payloadSettings.linkTo}
          target={itemsState.payloadSettings.linkTarget}>
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

function Img(props) {
  function isSelectedImage() {
    if (props.isFeatured) {
      return
    }

    return props.galleryState.featImage.src === props.image.src
  }

  const featThumbStyles = css`
    outline: 1px dashed #000000;
    outline-offset: 3px;
    transition: transform 100ms ease;

    &:hover {
      opacity: 1;
    }
  `

  const thumbnailStyles = css`
    display: block;
    margin-bottom: 10px;

    &:focus,
    &:active {
      outline: 1px dashed #000000;
      outline-offset: 3px;
    }
  `

  return (
    <img
      css={isSelectedImage() ? featThumbStyles : thumbnailStyles}
      ref={props.imageRef}
      itemProp='image'
      src={props.productImageSrc}
      className='wps-product-image lazyload'
      alt={props.image.altText}
      data-zoom={props.image.src}
    />
  )
}

ProductImage = wp.element.memo(ProductImage)

export { ProductImage }
