import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { FilterHook, __t } from '../../../../common/utils'
import { mq } from '../../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function CartLineItemPriceSaleNotice({ lineItem }) {
  const CartLineItemPriceSaleNoticeStyles = css`
    font-size: 15px;
    color: red;
    margin-left: 15px;
    margin-top: 10px;

    ${mq('small')} {
      margin-top: 0px;
    }
  `

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
      <span className='wps-cart-lineitem-price-sale' css={CartLineItemPriceSaleNoticeStyles}>
        <FilterHook name='cart.lineItem.price.sale'>{__t('Sale!')}</FilterHook>
      </span>
      {lineItem.compareAtPriceV2 && (
        <span css={priceWasCSS}>
          {__t('Was:')}
          {formatPriceToCurrency(
            lineItem.compareAtPriceV2.amount,
            lineItem.compareAtPriceV2.currencyCode
          )}
        </span>
      )}
    </>
  )
}

export default CartLineItemPriceSaleNotice