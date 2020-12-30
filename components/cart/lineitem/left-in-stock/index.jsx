/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { findTotalInventoryQuantity } from '../../../../common/variants';

function CartLineItemLeftInStock({ lineItemId, inventory }) {
  const { useState } = wp.element;

  const [quantityLeft] = useState(() => {
    return findTotalInventoryQuantity(inventory, lineItemId);
  });

  const CartLineItemLeftInStockCSS = css`
    color: red;
    position: absolute;
    bottom: 0;
  `;

  return quantityLeft ? (
    <small className='wps-cart-lineitem-left-in-stock' css={CartLineItemLeftInStockCSS}>
      {
        /* translators: %s: Only 9 left */
        wp.i18n.sprintf(wp.i18n.__('Only %s left!', 'wpshopify'), quantityLeft)
      }
    </small>
  ) : null;
}

export default CartLineItemLeftInStock;
