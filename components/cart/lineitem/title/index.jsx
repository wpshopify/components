import { FilterHook, __t } from '../../../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function CartLineItemTitle({ lineItem }) {
  const CartLineItemTitleCSS = css`
    display: inline-block;
    line-height: 1;
    max-width: 200px;
    margin-bottom: 5px;
  `

  return (
    <span className='wps-cart-lineitem-title-content col-9' css={CartLineItemTitleCSS}>
      <FilterHook name='cart.lineItem.title.text'>{__t(lineItem.product.title)}</FilterHook>
    </span>
  )
}

export { CartLineItemTitle }
