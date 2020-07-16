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

  function driftOptions() {
    return wp.hooks.applyFilters('default.image.zoom.options', {
      inlinePane: wpshopify.misc.isMobile,
      inlineContainer: paneElement.current,
      paneContainer: paneElement.current,
      inlineOffsetX: wpshopify.misc.isMobile ? -100 : 0,
      inlineOffsetY: wpshopify.misc.isMobile ? -100 : 0,
      touchDelay: 100,
    })
  }

  function showZoom() {
    if (isNull(payloadSettings.showZoom)) {
      return wpshopify.settings.general.productsImagesShowZoom
    }

    return payloadSettings.showZoom
  }

  function hasFeatImage() {
    return featImage && galleryState.featImageElement && paneElement.current
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

  const paneElementCSS = css`
    position: relative;
  `

  return (
    <div className='wps-gallery-featured-wrapper' ref={paneElement} css={paneElementCSS}>
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
