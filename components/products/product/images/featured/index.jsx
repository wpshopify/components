import { ProductContext } from '../../_state/context'
import { ProductGalleryContext } from '../gallery/_state/context'
import ProductImage from '../image'
import isNull from 'lodash/isNull'
import Drift from 'drift-zoom'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useEffect, useContext, useRef, useState } = wp.element

function getVariantImage(variant) {
  return variant.image
}

function destroyDrift(drift) {
  drift.destroy()
  window.Drift = null
  drift = null
}

function ProductFeaturedImage({ payloadSettings }) {
  const paneElement = useRef()
  const isFirstRender = useRef(true)
  const [productState] = useContext(ProductContext)
  const [galleryState] = useContext(ProductGalleryContext)
  const [featImage, setFeatImage] = useState(() => galleryState.featImage)
  const ProductFeaturedImageCSS = css`
    position: relative;
  `

  function driftOptions() {
    return wp.hooks.applyFilters('default.image.zoom.options', {
      paneContainer: paneElement.current,
      inlineOffsetX: -80,
    })
  }

  function showZoom() {
    if (isNull(payloadSettings.showZoom)) {
      return wpshopify.settings.general.productsImagesShowZoom
    }

    return payloadSettings.showZoom
  }

  function hasFeatImage() {
    return featImage && galleryState.featImageElement
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (galleryState.featImage) {
      setFeatImage(galleryState.featImage)
    }
  }, [galleryState.featImage])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (hasFeatImage() && showZoom()) {
      var drift = new Drift(galleryState.featImageElement, driftOptions())

      return () => {
        destroyDrift(drift)
      }
    }
  }, [galleryState.featImageElement])

  useEffect(() => {
    if (productState.selectedVariant) {
      setFeatImage(getVariantImage(productState.selectedVariant))
    }
  }, [productState.selectedVariant])

  return (
    <div className='wps-gallery-featured-wrapper' css={ProductFeaturedImageCSS} ref={paneElement}>
      <div className='wps-product-image-wrapper'>
        {featImage ? (
          <ProductImage payloadSettings={payloadSettings} isFeatured={true} image={featImage} />
        ) : (
          <ProductImage
            payloadSettings={payloadSettings}
            isFeatured={true}
            image={galleryState.featImagePlaceholder}
          />
        )}
      </div>
    </div>
  )
}

export { ProductFeaturedImage }
