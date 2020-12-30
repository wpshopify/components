/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '../../../../../../common/utils';

function ProductVariantMissingSelection() {
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `;
  return (
    <p css={selectStyles}>
      <FilterHook name='product.missingSelection.text'>
        {wp.i18n.__('Please select a variation', 'wpshopify')}
      </FilterHook>
    </p>
  );
}

export default ProductVariantMissingSelection;
