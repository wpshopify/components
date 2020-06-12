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

    .drift-zoom-pane {
      background: rgba(0, 0, 0, 0.5);
      transform: translateZ(0);
      -webkit-transform: translateZ(0);

      img {
        max-width: none !important;
        width: auto !important;
      }
    }
    .drift-zoom-pane.drift-opening {
      animation: a 0.18s ease-out;
      -webkit-animation: a 0.18s ease-out;
    }
    .drift-zoom-pane.drift-closing {
      animation: b 0.14s ease-in;
      -webkit-animation: b 0.14s ease-in;
    }
    .drift-zoom-pane.drift-inline {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 75px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
    .drift-loading .drift-zoom-pane-loader {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      width: 66px;
      height: 20px;
      animation: c 1.8s linear infinite;
      -webkit-animation: c 1.8s linear infinite;
    }
    .drift-zoom-pane-loader:after,
    .drift-zoom-pane-loader:before {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      margin-top: -10px;
      border-radius: 20px;
      background: hsla(0, 0%, 100%, 0.9);
    }
    .drift-zoom-pane-loader:before {
      left: 0;
      animation: d 1.8s linear infinite;
      -webkit-animation: d 1.8s linear infinite;
    }
    .drift-zoom-pane-loader:after {
      right: 0;
      animation: e 1.8s linear infinite;
      -webkit-animation: e 1.8s linear infinite;
      animation-delay: -0.9s;
      -webkit-animation-delay: -0.9s;
    }
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
