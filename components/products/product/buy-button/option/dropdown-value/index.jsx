/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function ProductVariantDropdownValue({ onSelection, variant }) {
  const ProductVariantDropdownValueCSS = css`
    margin: 0;
    padding: 12px;
    border-bottom: 1px solid #eee;
    font-size: 15px;
    text-align: center;
    color: black;
    list-style: none;
    line-height: 1.4;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f3f3f3;
      cursor: pointer;
    }
  `;
  return (
    <li
      itemProp='category'
      className='wps-product-variant wps-product-style wps-modal-close-trigger'
      onClick={onSelection}
      css={ProductVariantDropdownValueCSS}>
      <FilterHook name='products.variant.title.text'>{variant.value}</FilterHook>
    </li>
  );
}

export default wp.element.memo(ProductVariantDropdownValue);
