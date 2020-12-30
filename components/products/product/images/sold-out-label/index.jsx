/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '../../../../../common/utils';

function ProductImageSoldOutLabel() {
  const ProductImageSoldOutLabelCSS = css`
    position: absolute;
    background: red;
    color: white;
    text-transform: uppercase;
    font-size: 13px;
    padding: 4px 10px;
  `;

  return (
    <span className='wps-product-image-sold-out-label' css={ProductImageSoldOutLabelCSS}>
      <FilterHook name='product.image.soldOut.text'>
        {wp.i18n.__('Sold out', 'wpshopify')}
      </FilterHook>
    </span>
  );
}

export default wp.element.memo(ProductImageSoldOutLabel);
