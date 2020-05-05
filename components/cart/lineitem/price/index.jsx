/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import CartLineItemPriceSaleNotice from '../sale-notice'
import { mq } from '../../../../common/css'

function CartLineItemPrice({ lineItem, currencyCode, lineItemTotal, lineItemTotalElement }) {
  const priceCSS = css`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ${mq('small')} {
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

  console.log('........... lineItem ............', lineItem)

  return (
    <div className='wps-cart-lineitem-price-total-wrapper' css={priceCSS}>
      <div
        className='wps-cart-lineitem-price wps-cart-lineitem-price-total'
        ref={lineItemTotalElement}
        css={lineItemPriceCSS}>
        {formatPriceToCurrency(lineItemTotal, currencyCode)}
      </div>

      <CartLineItemPriceSaleNotice />
    </div>
  )
}

export { CartLineItemPrice }
