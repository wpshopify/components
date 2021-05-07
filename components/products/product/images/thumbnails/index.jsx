import Thumbnails from './mapped';
import { doFeaturedSizing } from '../../../../../common/images';
import { mq } from '../../../../../common/css';
import isEmpty from 'lodash/isEmpty';
import to from 'await-to-js';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function ProductThumbnailImages({ product, payloadSettings }) {
  const { useState } = wp.element;
  const [preloadStatus, setPreloadStatus] = useState('idle');

  const [thumbnails] = useState(product.images);

  const thumbnailsWrapperCSS = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 0px;
    margin-top: 12px;
    max-width: 410px;

    ${mq('large')} {
      display: flex;
      flex-wrap: wrap;
      gap: 0px 8px;
      max-width: 100%;

      > div {
        width: 57px;
      }
    }
  `;

  function hasImages() {
    if (payloadSettings.linkTo === 'modal') {
      return false;
    }

    return product && !isEmpty(product.images);
  }

  function preload(imageObj) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = resolve;
      img.onerror = reject;
      img.src = doFeaturedSizing(imageObj.src, payloadSettings);
    });
  }

  function preloadAll(images) {
    return Promise.all(images.map(preload));
  }

  async function preloadImages() {
    await to(preloadAll(product.images));

    setPreloadStatus('done');
  }

  function onMouseEnter() {
    if (preloadStatus === 'done') {
      return;
    }

    preloadImages();
  }

  return hasImages() ? (
    <div className='wps-thumbnails-wrapper' css={thumbnailsWrapperCSS} onMouseEnter={onMouseEnter}>
      <Thumbnails thumbnails={thumbnails} payloadSettings={payloadSettings} />
    </div>
  ) : null;
}

export default wp.element.memo(ProductThumbnailImages);
