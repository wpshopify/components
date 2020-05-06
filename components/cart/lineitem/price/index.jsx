/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import CartLineItemPriceSaleNotice from '../sale-notice'
import { mq } from '../../../../common/css'

function CartLineItemPrice({ lineItem, currencyCode, lineItemTotal, lineItemTotalElement }) {
  const priceCSS = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ${mq('small')} {
      align-items: baseline;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 10px;
    }
  `

  const lineItemPriceCSS = css`
    line-height: 1;
    margin-top: 0;
    font-size: 15px;

    ${mq('small')} {
      text-align: left;
      font-size: 17px;
      margin-left: 0;
      left: 0;
    }
  `

  return (
    <div className='wps-cart-lineitem-price-total-wrapper' css={priceCSS}>
      <div
        className='wps-cart-lineitem-price wps-cart-lineitem-price-total'
        ref={lineItemTotalElement}
        css={lineItemPriceCSS}>
        {formatPriceToCurrency(lineItemTotal, currencyCode)}
      </div>

      {lineItem.compareAtPriceV2 && <CartLineItemPriceSaleNotice lineItem={lineItem} />}
    </div>
  )
}

export default wp.element.memo(CartLineItemPrice)
