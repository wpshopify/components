/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import PrettyPrice from '../../../../common/pricing/pretty';
import { shouldShowSaleNotice } from '../../../../common/pricing/data';
import CartLineItemPriceSaleNotice from '../sale-notice';
import { mq } from '../../../../common/css';

function CartLineItemPrice({
  lineItem,
  currencyCode,
  lineItemTotal,
  lineItemTotalElement,
  lineItemQuantity,
}) {
  const showingSaleNotice = shouldShowSaleNotice(lineItem);

  const priceCSS = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    + .wps-cart-lineitem-left-in-stock {
      bottom: ${showingSaleNotice ? 0 : '-25px'};
    }

    ${mq('small')} {
      align-items: baseline;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 10px;

      + .wps-cart-lineitem-left-in-stock {
        bottom: -10px;
      }
    }
  `;

  const lineItemPriceCSS = css`
    line-height: 1;
    margin-top: 0;
    font-size: 15px;
    color: #121212;

    ${mq('small')} {
      text-align: left;
      font-size: 17px;
      margin-left: 0;
      left: 0;
    }
  `;

  return (
    <div className='wps-cart-lineitem-price-total-wrapper' css={priceCSS}>
      <div
        className='wps-cart-lineitem-price wps-cart-lineitem-price-total'
        ref={lineItemTotalElement}
        css={lineItemPriceCSS}>
        <PrettyPrice price={lineItemTotal} currencyCode={currencyCode} />
      </div>

      {showingSaleNotice && (
        <CartLineItemPriceSaleNotice lineItem={lineItem} lineItemQuantity={lineItemQuantity} />
      )}
    </div>
  );
}

export default wp.element.memo(CartLineItemPrice);
