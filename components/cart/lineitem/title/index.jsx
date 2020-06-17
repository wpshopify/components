import { FilterHook } from '../../../../common/utils'
import { mq } from '../../../../common/css'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function CartLineItemTitle({ lineItem }) {
  const CartLineItemTitleCSS = css`
    display: inline-block;
    line-height: 1.3;
    max-width: 200px;
    margin-bottom: 5px;

    ${mq('small')} {
      max-width: 150px;
      line-height: 1.4;
      margin-top: -3px;
    }
  `

  return (
    <span className='wps-cart-lineitem-title-content' css={CartLineItemTitleCSS}>
      <FilterHook name='cart.lineItem.title.text'>{lineItem.product.title}</FilterHook>
    </span>
  )
}

export { CartLineItemTitle }
