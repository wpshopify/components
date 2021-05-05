import { ProductContext } from '../../_state/context';
import { ProductGalleryContext } from './_state/context';
import ProductThumbnailImages from '../thumbnails';
import { ProductFeaturedImage } from '../featured';
import ProductCarouselImages from '../carousel';
import { hasLink } from '../../../../../common/settings';

function ProductGallery({ payloadSettings }) {
  const { useEffect, useContext, useRef } = wp.element;
  const [productState] = useContext(ProductContext);
  const [, galleryDispatch] = useContext(ProductGalleryContext);
  const isFirstRender = useRef(true);
  const product = productState.payload;

  function hasManyImages() {
    if (!productState) {
      return false;
    }

    return productState.hasManyImages;
  }

  function isFeaturedOnly() {
    if (hasLink(payloadSettings)) {
      if (payloadSettings.showFeaturedOnly) {
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
        payload:
          productState.payload && productState.payload.images
            ? productState.payload.images[0]
            : false,
      });
    }
  }, [productState.selectedVariant]);

  return (
    <>
      {isFeaturedOnly() ? (
        <ProductFeaturedImage payloadSettings={payloadSettings} />
      ) : hasManyImages() ? (
        payloadSettings.showImagesCarousel && wpshopify.misc.isPro ? (
          <ProductCarouselImages payloadSettings={payloadSettings} images={product.images} />
        ) : (
          <>
            <ProductFeaturedImage payloadSettings={payloadSettings} />
            <ProductThumbnailImages product={product} payloadSettings={payloadSettings} />
          </>
        )
      ) : (
        <ProductFeaturedImage payloadSettings={payloadSettings} />
      )}
    </>
  );
}

export { ProductGallery };
