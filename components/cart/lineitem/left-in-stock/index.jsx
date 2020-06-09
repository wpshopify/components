/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { findTotalInventoryQuantity } from '../../../../common/variants'

function CartLineItemLeftInStock({ lineItemId, inventory }) {
  const { useState } = wp.element

  const [quantityLeft] = useState(() => {
    return findTotalInventoryQuantity(inventory, lineItemId)
  })

  const CartLineItemLeftInStockCSS = css`
    color: red;
  `

  return (
    quantityLeft && (
      <small className='wps-cart-lineitem-left-in-stock' css={CartLineItemLeftInStockCSS}>
        Only {quantityLeft} left!
      </small>
    )
  )
}

export default CartLineItemLeftInStock
