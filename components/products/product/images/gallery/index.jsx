import { useProductState } from '../../_state/hooks';
import { ProductGalleryContext } from './_state/context';
import ProductThumbnailImages from '../thumbnails';
import { ProductFeaturedImage } from '../featured';
import ProductCarouselImages from '../carousel';
import { hasLink } from '../../../../../common/settings';

function ProductGallery({ payloadSettings, payload }) {
  const { useEffect, useContext, useRef } = wp.element;
  const productState = useProductState();
  const [, galleryDispatch] = useContext(ProductGalleryContext);
  const isFirstRender = useRef(true);

  function hasManyImages() {
    if (!productState) {
      return false;
    }

    return productState.hasManyImages;
  }

  function isFeaturedOnly() {
    if (hasLink(payloadSettings)) {
      if (payloadSettings.showFeaturedOnly || payloadSettings.linkTo !== 'none') {
        return true;
      } else {
        return false;
      }
    }

    return payloadSettings.showFeaturedOnly;
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (productState.selectedVariant) {
      galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: productState.selectedVariant.image });
    } else {
      galleryDispatch({
        type: 'SET_FEAT_IMAGE',
        payload: payload && payload.images ? payload.images[0] : false,
      });
    }
  }, [productState.selectedVariant]);

  return (
    <>
      {isFeaturedOnly() ? (
        <ProductFeaturedImage
          selectedVariant={productState.selectedVariant}
          isOnSale={productState.isOnSale}
          payload={payload}
          payloadSettings={payloadSettings}
        />
      ) : hasManyImages() ? (
        payloadSettings.showImagesCarousel && wpshopify.misc.isPro ? (
          <ProductCarouselImages payloadSettings={payloadSettings} images={payload.images} />
        ) : (
          <>
            <ProductFeaturedImage
              selectedVariant={productState.selectedVariant}
              payload={payload}
              payloadSettings={payloadSettings}
              isOnSale={productState.isOnSale}
            />
            <ProductThumbnailImages product={payload} payloadSettings={payloadSettings} />
          </>
        )
      ) : (
        <ProductFeaturedImage
          selectedVariant={productState.selectedVariant}
          payload={payload}
          payloadSettings={payloadSettings}
          isOnSale={productState.isOnSale}
        />
      )}
    </>
  );
}

export { ProductGallery };
