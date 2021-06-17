/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function ProductVariantMissingSelection({ productOptionState }) {
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `;

  return (
    <p css={selectStyles}>
      <FilterHook name='product.missingSelection.text' args={[productOptionState]}>
        {wp.i18n.__('Please select a ', 'wpshopify') + productOptionState.option.name.toLowerCase()}
      </FilterHook>
    </p>
  );
}

export default ProductVariantMissingSelection;
