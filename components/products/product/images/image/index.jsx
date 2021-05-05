import { ProductContext } from '../../_state/context';
import { ProductGalleryContext } from '../gallery/_state/context';
import { doFeaturedSizing, doThumbnailSizing } from '../../../../../common/images';
import Img from './img';

import { hasLink } from '../../../../../common/settings';

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ '../../../../link')
);

function ProductImage({ image, isFeatured, payloadSettings, placeholder = false }) {
  const { useEffect, useContext, useRef, useState } = wp.element;
  const imageRef = useRef();
  const [productState] = useContext(ProductContext);
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext);
  const [productImageSrc, setProductImageSrc] = useState(() => applyImageSizing());

  function applyImageSizing() {
    if (placeholder) {
      return image.src;
    }

    if (isFeatured) {
      if (payloadSettings.imagesSizingToggle) {
        return doFeaturedSizing(image.src, payloadSettings);
      }

      return image.src;
    } else {
      if (payloadSettings.thumbnailImagesSizingToggle) {
        return doThumbnailSizing(image.src, payloadSettings);
      }
      return image.src;
    }
  }

  useEffect(() => {
    setProductImageSrc(applyImageSizing());

    if (isFeatured) {
      galleryDispatch({ type: 'SET_FEAT_IMAGE_ELEMENT', payload: imageRef.current });
    }
  }, [image]);

  /*
   
   TODO: Fix duplication here. For some reason the Drift image zoom breaks if we move 
   the image tag into a resuable component. Probably something to do with ref forwarding.

   */
  return productImageSrc ? (
    hasLink(payloadSettings) ? (
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
          linkTo={payloadSettings.linkTo}
        />
      </Link>
    ) : (
      <Img
        imageRef={imageRef}
        image={image}
        productImageSrc={productImageSrc}
        galleryState={galleryState}
        isFeatured={isFeatured}
        linkTo={payloadSettings.linkTo}
      />
    )
  ) : null;
}

export default wp.element.memo(ProductImage);
