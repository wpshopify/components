/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '../../../../../common/utils';

function ProductPriceFrom({ compareAt }) {
  const fromCSS = css`
    margin-right: 5px;
    font-size: 15px;
    font-style: none;
    color: #121212;
  `;

  return !compareAt ? (
    <small css={fromCSS} className='wps-product-from-price'>
      <FilterHook name='product.pricing.from.text'>{wp.i18n.__('Price:', 'wpshopify')}</FilterHook>
    </small>
  ) : null;
}

export default wp.element.memo(ProductPriceFrom);
