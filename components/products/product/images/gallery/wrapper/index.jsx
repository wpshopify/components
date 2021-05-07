/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductGallery } from '../index';
import { ProductGalleryProvider } from '../_state/provider.jsx';

function ProductGalleryWrapper({ payloadSettings, payload }) {
  const ProductGalleryWrapperCSS = css`
    margin-bottom: ${payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

  return (
    <div className='wps-component wps-component-products-images' css={ProductGalleryWrapperCSS}>
      <ProductGalleryProvider payload={payload}>
        <ProductGallery payloadSettings={payloadSettings} />
      </ProductGalleryProvider>
    </div>
  );
}

export { ProductGalleryWrapper };
