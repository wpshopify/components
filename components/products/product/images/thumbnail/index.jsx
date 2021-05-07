/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ProductImage from '../image';
import { ProductGalleryContext } from '../gallery/_state/context';
import { FilterHook } from '../../../../../common/utils';

function ProductThumbnailImage({ image, payload, payloadSettings }) {
  const { useEffect, useContext, useState } = wp.element;
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext);
  const [isActive, setIsActive] = useState(() => false);

  const ThumbnailCSS = css`
    transition: outline 0.2s ease;

    &:hover {
      img {
        outline: 1px dashed #000000;
        outline-offset: 3px;
      }
    }
  `;

  useEffect(
    function () {
      if (!checkIsActive(galleryState.featImage.src)) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    },
    [galleryState.featImage]
  );

  function checkIsActive(featImageSrc) {
    return featImageSrc === image.src;
  }

  function onClick() {
    galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: image });
  }

  return (
    <div
      css={ThumbnailCSS}
      className='wps-component wps-component-products-images-thumbnail'
      onClick={onClick}
      data-wps-is-active={isActive}>
      <ProductImage
        payloadSettings={payloadSettings}
        isFeatured={false}
        image={image}
        payload={payload}
      />
      <FilterHook
        name='after.product.thumbnail'
        hasHTML={true}
        args={[image, galleryState, payloadSettings]}
      />
    </div>
  );
}

export default wp.element.memo(ProductThumbnailImage);
