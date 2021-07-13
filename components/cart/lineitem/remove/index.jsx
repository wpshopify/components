/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function CartLineItemRemove({ onRemove }) {
  const removeStyles = css`
    position: absolute;
    top: -12px;
    right: 0;
    font-size: 13px;
    text-decoration: underline;
    padding-right: 0;
    text-align: right;
    padding: 13px 0;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  `;

  return (
    <span className='wps-cart-lineitem-remove' css={removeStyles} onClick={onRemove}>
      <FilterHook name='cart.lineItem.remove.text'>{wp.i18n.__('Remove', 'wpshopify')}</FilterHook>
    </span>
  );
}

export { CartLineItemRemove };
