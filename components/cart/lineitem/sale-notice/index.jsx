import PrettyPrice from '../../../../common/pricing/pretty';
import CartLineItemPriceSaleNoticeNotice from './notice';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function CartLineItemPriceSaleNotice({ lineItem, lineItemQuantity }) {
  const priceWasCSS = css`
    display: inline-block;
    line-height: 1;
    padding: 0;
    font-weight: normal;
    margin: 0;
    font-size: 15px;
    color: #313131;
    text-decoration: line-through;
    margin-left: 10px;
  `;

  function calcWasPrice() {
    return parseInt(lineItem.compareAtPriceV2.amount) * lineItemQuantity;
  }

  return (
    <>
      <CartLineItemPriceSaleNoticeNotice />

      <span css={priceWasCSS}>
        {wp.i18n.__('Was:', 'wpshopify')}
        <PrettyPrice price={calcWasPrice()} currencyCode={lineItem.compareAtPriceV2.currencyCode} />
      </span>
    </>
  );
}

export default CartLineItemPriceSaleNotice;
