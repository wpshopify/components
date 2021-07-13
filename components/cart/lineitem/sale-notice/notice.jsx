/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { mq } from '../../../../common/css';

function CartLineItemPriceSaleNoticeNotice() {
  const CartLineItemPriceSaleNoticeStyles = css`
    font-size: 15px;
    color: red;
    margin-left: 15px;
    margin-top: 10px;

    ${mq('small')} {
      margin-top: 0px;
    }
  `;

  return (
    <span className='wps-cart-lineitem-price-sale' css={CartLineItemPriceSaleNoticeStyles}>
      <FilterHook name='cart.lineItem.price.sale'>{wp.i18n.__('Sale!', 'wpshopify')}</FilterHook>
    </span>
  );
}

export default CartLineItemPriceSaleNoticeNotice;
