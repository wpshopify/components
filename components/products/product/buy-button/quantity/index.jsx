/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ProductQuantityLabel from './label';
import { ProductQuantityInput } from './input';
import { containsOnly } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function ProductQuantity({
  payload,
  showLabel,
  labelText,
  minQuantity,
  maxQuantity,
  addedToCart,
  excludes,
}) {
  if (!excludes) {
    var onlyExcludingDesc = true;
  } else {
    var onlyExcludingDesc = containsOnly(excludes, ['description']);
  }

  const ProductQuantityCSS = css`
    border-top: ${onlyExcludingDesc ? '1px solid #e5e5e5' : 'none'};
    border-bottom: ${onlyExcludingDesc ? '1px solid #e5e5e5' : 'none'};
    padding-top: ${onlyExcludingDesc ? '25px' : '0'};
  `;

  return (
    <div
      className='wps-component wps-component-products-quantity'
      aria-label='Product Quantity'
      css={ProductQuantityCSS}>
      <div className='wps-form-control wps-product-quantity-wrapper'>
        <ProductQuantityLabel showLabel={showLabel} labelText={labelText} />
        <ProductQuantityInput
          minQuantity={minQuantity}
          maxQuantity={maxQuantity}
          addedToCart={addedToCart}
          payload={payload}
        />
      </div>
    </div>
  );
}

export default wp.element.memo(ProductQuantity);
