/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartLineItems } from '../lineitems'
import { FilterHook } from '../../../common/utils'
import { getCache } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

function filterEmptyLineItems(lineItems) {
  return lineItems.filter(Boolean)
}

function CartContents(props) {
  const { useState } = wp.element

  const [inventory] = useState(() => {
    var inv = getCache('wps-inventory-levels')
    if (inv) {
      return JSON.parse(inv)
    }

    return false
  })

  const CartTitleCSS = css`
    top: 45%;
    text-align: center;
    color: #ddd;
    position: absolute;
    margin: 0;
    width: 100%;
    font-size: 1.5em;
    margin: 0;
    text-align: center;
  `

  const CartContentsCSS = css`
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    flex-grow: 1;
    padding-top: 4.5em;
    position: relative;

    > .wps-notice {
      position: relative;
      top: 30%;
    }

    &[data-is-cart-empty='true'] .wps-notice-info {
      background: none;
      border: none;
      font-size: 24px;
    }
  `

  return (
    <section
      className='wps-cart-contents'
      data-is-cart-empty={props.isCartEmpty}
      css={CartContentsCSS}>
      {props.isCartEmpty ? (
        <h2 css={CartTitleCSS}>
          <FilterHook name='cart.empty.text'>
            {wp.i18n.__('Your cart is empty', 'wpshopify')}
          </FilterHook>
        </h2>
      ) : (
        <CartLineItems
          inventory={inventory}
          lineItems={filterEmptyLineItems(props.checkoutCache.variants)}
        />
      )}
    </section>
  )
}

export default CartContents
