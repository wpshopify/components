/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CollectionContext } from '../_state/context';
import { usePortal } from '../../../../common/hooks';
import { addCustomSizingToImageUrl } from '../../../../common/images';
import { findPortalElement } from '../../../../common/utils';

const Link = wp.element.lazy(() => import(/* webpackChunkName: 'Link-public' */ '../../../link'));

const { useContext, useState, useEffect } = wp.element;

function CollectionImage({ payloadSettings }) {
  const [collectionState] = useContext(CollectionContext);

  const [imageSrc, setImageSrc] = useState(() =>
    collectionState.payload.image ? collectionState.payload.image.src : false
  );

  useEffect(() => {
    if (!imageSrc) {
      return;
    }

    if (collectionState.imagesSizingToggle) {
      setImageSrc(
        addCustomSizingToImageUrl({
          src: collectionState.payload.image.src,
          width: collectionState.imagesSizingWidth,
          height: collectionState.imagesSizingHeight,
          crop: collectionState.imagesSizingCrop,
          scale: collectionState.imagesSizingScale,
        })
      );
    }
  }, []);

  const CollectionImageWrapperCSS = css`
    margin-bottom: 20px;
    max-width: 400px;
  `;

  const CollectionImageCSS = css`
    max-width: 100%;
  `;

  return usePortal(
    imageSrc ? (
      <div className='wps-component wps-component-collection-image' css={CollectionImageWrapperCSS}>
        <Link
          type='collections'
          payload={collectionState.payload}
          linkTo={payloadSettings.linkTo}
          target={payloadSettings.linkTarget}>
          <img
            itemProp='image'
            src={imageSrc}
            className='wps-product-image'
            css={CollectionImageCSS}
            alt={collectionState.payload.image ? collectionState.payload.image.altText : ''}
            loading='lazy'
          />
        </Link>
      </div>
    ) : null,
    findPortalElement(payloadSettings.dropzoneCollectionImage)
  );
}

export { CollectionImage };
