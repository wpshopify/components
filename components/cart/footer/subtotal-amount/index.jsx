/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PrettyPrice from '../../../../common/pricing/pretty'

function CartFooterSubtotalAmount({
  total,
  currencyCode,
  totalElement,
  discountCode,
  beforeDiscountTotal,
}) {
  const CartFooterSubtotalAmountCSS = css`
    font-weight: bold;
    text-align: right;
    font-size: 28px;
  `

  const fullPriceCSS = css`
    font-size: 20px;
    font-weight: normal;
    text-decoration: line-through;
    color: #b4b4b4;
    margin-right: 10px;
  `

  return (
    <p className='wps-total-amount' ref={totalElement} css={CartFooterSubtotalAmountCSS}>
      {discountCode && beforeDiscountTotal && beforeDiscountTotal !== total && (
        <span css={fullPriceCSS}>
          <PrettyPrice price={beforeDiscountTotal} currencyCode={currencyCode} />
        </span>
      )}

      <PrettyPrice price={total} currencyCode={currencyCode} />
    </p>
  )
}

export default CartFooterSubtotalAmount
