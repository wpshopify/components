/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductGalleryContext } from '../gallery/_state/context';

import ProductImage from '../image';
import isNull from 'lodash/isNull';
import Drift from 'drift-zoom';

const ProductImageSoldOutLabel = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductImageSoldOutLabel-public' */ '../sold-out-label')
);

const { useEffect, useContext, useRef, useState, Suspense } = wp.element;

function getVariantImage(variant) {
  return variant.image;
}

function destroyDrift(drift) {
  drift.destroy();
  window.Drift = null;
  drift = null;
}

function ProductFeaturedImage({ payloadSettings, selectedVariant, payload }) {
  const paneElement = useRef();
  const isFirstRender = useRef(true);
  const [galleryState] = useContext(ProductGalleryContext);
  const [featImage, setFeatImage] = useState(() => galleryState.featImage);

  function driftOptions() {
    return wp.hooks.applyFilters('default.image.zoom.options', {
      inlinePane: wpshopify.misc.isMobile,
      inlineContainer: paneElement.current,
      paneContainer: paneElement.current,
      inlineOffsetX: wpshopify.misc.isMobile ? -100 : 0,
      inlineOffsetY: wpshopify.misc.isMobile ? -100 : 0,
      touchDelay: 100,
    });
  }

  function showZoom() {
    if (isNull(payloadSettings.showZoom)) {
      return wpshopify.settings.general.productsImagesShowZoom;
    }

    return payloadSettings.showZoom;
  }

  function hasFeatImage() {
    return featImage && galleryState.featImageElement && paneElement.current;
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (galleryState.featImage) {
      setFeatImage(galleryState.featImage);
    }
  }, [galleryState.featImage]);

  useEffect(() => {
    if (!wpshopify.misc.isPro) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (hasFeatImage() && showZoom()) {
      var drift = new Drift(galleryState.featImageElement, driftOptions());

      return () => {
        destroyDrift(drift);
      };
    }
  }, [galleryState.featImageElement]);

  useEffect(() => {
    if (selectedVariant) {
      setFeatImage(getVariantImage(selectedVariant));
    }
  }, [selectedVariant]);

  const paneElementCSS = css`
    position: relative;
  `;

  const ProductImageFeaturedWrapperCSS = css`
    display: flex;
    align-items: flex-start;
    justify-content: ${payloadSettings.imagesAlign === 'left'
      ? 'flex-start'
      : payloadSettings.imagesAlign === 'right'
      ? 'flex-end'
      : payloadSettings.imagesAlign};
  `;

  return (
    <div className='wps-gallery-featured-wrapper' ref={paneElement} css={paneElementCSS}>
      {payload.availableForSale === false && featImage && (
        <Suspense fallback={false}>
          <ProductImageSoldOutLabel />
        </Suspense>
      )}
      <div className='wps-product-image-wrapper' css={ProductImageFeaturedWrapperCSS}>
        {featImage ? (
          <ProductImage
            payload={payload}
            payloadSettings={payloadSettings}
            isFeatured={true}
            image={featImage}
          />
        ) : (
          <ProductImage
            payload={payload}
            payloadSettings={payloadSettings}
            isFeatured={true}
            image={galleryState.featImagePlaceholder}
            placeholder={true}
          />
        )}
      </div>
    </div>
  );
}

export { ProductFeaturedImage };
