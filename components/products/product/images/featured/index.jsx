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
    @keyframes a {
      0% {
        transform: scale(1.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes b {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      15% {
        transform: scale(1.1);
        opacity: 1;
      }
      to {
        transform: scale(0.5);
        opacity: 0;
      }
    }
    @keyframes c {
      0% {
        transform: translate(-50%, -50%) rotate(0);
      }
      50% {
        transform: translate(-50%, -50%) rotate(-180deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(-1turn);
      }
    }
    @keyframes d {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(1.2) translateX(6px);
      }
      25% {
        transform: scale(1.3) translateX(8px);
      }
      40% {
        transform: scale(1.2) translateX(6px);
      }
      50% {
        transform: scale(1);
      }
      60% {
        transform: scale(0.8) translateX(6px);
      }
      75% {
        transform: scale(0.7) translateX(8px);
      }
      90% {
        transform: scale(0.8) translateX(6px);
      }
      to {
        transform: scale(1);
      }
    }
    @keyframes e {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(1.2) translateX(-6px);
      }
      25% {
        transform: scale(1.3) translateX(-8px);
      }
      40% {
        transform: scale(1.2) translateX(-6px);
      }
      50% {
        transform: scale(1);
      }
      60% {
        transform: scale(0.8) translateX(-6px);
      }
      75% {
        transform: scale(0.7) translateX(-8px);
      }
      90% {
        transform: scale(0.8) translateX(-6px);
      }
      to {
        transform: scale(1);
      }
    }

    .drift-zoom-pane {
      background: rgba(0, 0, 0, 0.5);
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      border-radius: 50%;
      width: 300px;
      height: 300px;
      z-index: 999;

      img {
        max-width: none !important;
        width: auto !important;
      }
    }
    .drift-zoom-pane.drift-opening {
      animation: a 0.18s ease-out;
    }
    .drift-zoom-pane.drift-closing {
      animation: b 0.14s ease-in;
    }
    .drift-zoom-pane.drift-inline {
      position: absolute;
      width: ${wpshopify.misc.isMobile ? '250px' : '150px'};
      height: ${wpshopify.misc.isMobile ? '250px' : '150px'};
      border-radius: ${wpshopify.misc.isMobile ? '50%' : '75px'};
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
    .drift-loading .drift-zoom-pane-loader {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 66px;
      height: 20px;
      animation: c 1.8s linear infinite;
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
    }
    .drift-zoom-pane-loader:after {
      right: 0;
      animation: e 1.8s linear infinite;
      animation-delay: -0.9s;
    }
  `

  function driftOptions() {
    return wp.hooks.applyFilters('default.image.zoom.options', {
      inlineContainer: paneElement.current,
      paneContainer: paneElement.current,
      inlineOffsetX: wpshopify.misc.isMobile ? -100 : 0,
      inlineOffsetY: wpshopify.misc.isMobile ? -100 : -20,
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
