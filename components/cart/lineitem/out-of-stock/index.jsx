import { FilterHook } from '../../../../common/utils';
import { Notice } from '../../../notices';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function CartLineItemOutOfStock() {
  const extraCSS = css`
    font-size: 13px;
  `;
  return (
    <Notice status='warning' isDismissible={false} extraCSS={extraCSS}>
      <FilterHook name='notice.unavailable.text'>
        {wp.i18n.__('Out of stock', 'wpshopify')}
      </FilterHook>
    </Notice>
  );
}

export { CartLineItemOutOfStock };
