import { FilterHook, __t } from '../../../../common/utils'
import { mq } from '../../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function CartLineItemPriceSaleNotice({ lineItem }) {
  const CartLineItemPriceSaleNoticeStyles = css`
    font-size: 15px;
    color: red;
    margin-left: 10px;

    ${mq('small')} {
      font-size: 17px;
    }
  `
  return (
    <span className='wps-cart-lineitem-price-sale' css={CartLineItemPriceSaleNoticeStyles}>
      <FilterHook name='cart.lineItem.price.sale'>{__t('Sale!')}</FilterHook>
    </span>
  )
}

export default CartLineItemPriceSaleNotice
