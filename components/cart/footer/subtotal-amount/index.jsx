/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import PrettyPrice from '../../../../common/pricing/pretty';
import { mq } from '../../../../common/css';
import SavingsInline from '../../../savings-inline';

function CartFooterSubtotalAmount({
  total,
  currencyCode,
  totalElement,
  discountCode,
  beforeDiscountTotal,
  percentageOff,
  amountOff,
}) {
  const CartFooterSubtotalAmountCSS = css`
    font-weight: bold;
    text-align: right;
    font-size: 28px;
    color: #121212;

    ${mq('small')} {
      font-size: 42px;
    }
  `;

  const fullPriceCSS = css`
    font-size: 20px;
    font-weight: normal;
    text-decoration: line-through;
    color: #b4b4b4;
    margin-right: 10px;
  `;

  return (
    <>
      <p className='wps-total-amount' ref={totalElement} css={CartFooterSubtotalAmountCSS}>
        {percentageOff && discountCode && (
          <SavingsInline amount={percentageOff} type='percentage' />
        )}
        {amountOff && discountCode && (
          <SavingsInline amount={amountOff} type='fixed' currencyCode={currencyCode} />
        )}
        {discountCode && beforeDiscountTotal && beforeDiscountTotal !== total && (
          <span css={fullPriceCSS}>
            <PrettyPrice price={beforeDiscountTotal} currencyCode={currencyCode} />
          </span>
        )}

        <PrettyPrice price={total} currencyCode={currencyCode} />
      </p>
    </>
  );
}

export default CartFooterSubtotalAmount;
