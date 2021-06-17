/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { usePortal } from '../../../../common/hooks';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function StorefrontFilterOptionsHeading({ dropzone }) {
  const headingCSS = css`
    font-size: 20px;
  `;
  return usePortal(
    <h2 className='wps-storefront-heading' css={headingCSS}>
      <FilterHook name='storefront.selections.filter.label'>
        {wp.i18n.__('Filter by', 'wpshopify')}
      </FilterHook>
    </h2>,
    document.querySelector(dropzone)
  );
}

export default StorefrontFilterOptionsHeading;
