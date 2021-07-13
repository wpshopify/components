/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../../notice')
);

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
