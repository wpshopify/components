/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function ProductQuantityLabel({ showLabel, labelText }) {
  const ProductQuantityLabelWrapperCSS = css`
    display: inline-block;
    margin: 0;
  `;

  const ProductQuantityLabelCSS = css`
    font-weight: normal;
    color: #121212;
  `;

  return showLabel ? (
    <div
      className='wps-quantity-input wps-quantity-label-wrapper'
      css={ProductQuantityLabelWrapperCSS}>
      <label htmlFor='wps-product-quantity' css={ProductQuantityLabelCSS}>
        <FilterHook name='products.quantity.label.text'>{labelText}</FilterHook>
      </label>
    </div>
  ) : null;
}

export default wp.element.memo(ProductQuantityLabel);
