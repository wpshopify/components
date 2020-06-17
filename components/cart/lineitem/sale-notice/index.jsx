import PrettyPrice from '../../../../common/pricing/pretty'
import CartLineItemPriceSaleNoticeNotice from './notice'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function CartLineItemPriceSaleNotice({ lineItem }) {
  const priceWasCSS = css`
    display: inline-block;
    line-height: 1;
    padding: 0;
    font-weight: normal;
    margin: 0;
    font-size: 15px;
    color: #848484;
    text-decoration: line-through;
    margin-left: 10px;
  `

  return (
    <>
      <CartLineItemPriceSaleNoticeNotice />

      <span css={priceWasCSS}>
        {wp.i18n.__('Was:', 'wpshopify')}
        <PrettyPrice
          price={lineItem.compareAtPriceV2.amount}
          currencyCode={lineItem.compareAtPriceV2.currencyCode}
        />
      </span>
    </>
  )
}

export default CartLineItemPriceSaleNotice
