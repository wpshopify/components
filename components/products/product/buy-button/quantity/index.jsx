/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ProductQuantityLabel from './label';
import { ProductQuantityInput } from './input';

function onlyExcludingDesc(excludes) {
  if (!excludes) {
    var onlyExcludingDesc = true;

  } else {

    if (typeof excludes === 'string') {

      if (excludes === 'description') {
        var onlyExcludingDesc = true;

      } else {
        var onlyExcludingDesc = false;
      }

    } else {
      var onlyExcludingDesc = false;
    }
    
  }

  return onlyExcludingDesc;
}

function ProductQuantity({
  payload,
  showLabel,
  labelText,
  minQuantity,
  maxQuantity,
  addedToCart,
  excludes,
}) {

  const excludingDesc = onlyExcludingDesc(excludes)

  const ProductQuantityCSS = css`
    border-top: ${excludingDesc ? '1px solid #e5e5e5' : 'none'};
    border-bottom: ${excludingDesc ? '1px solid #e5e5e5' : 'none'};
    padding-top: ${excludingDesc ? '25px' : '0'};
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
