/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function ProductImageOnSaleLabel() {
  const ProductImageOnSaleLabelCSS = css`
    position: absolute;
    background: #b62907;
    color: white;
    text-transform: uppercase;
    font-size: 13px;
    padding: 4px 10px;
  `;

  return (
    <span className='wps-product-image-on-sale-label' css={ProductImageOnSaleLabelCSS}>
      <FilterHook name='product.onSale.text'>{wp.i18n.__('Sale!', 'wpshopify')}</FilterHook>
    </span>
  );
}

export default wp.element.memo(ProductImageOnSaleLabel);
