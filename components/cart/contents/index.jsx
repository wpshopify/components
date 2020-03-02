/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartLineItems } from '../lineitems'

const { Notice } = wp.components
const { __ } = wp.i18n

function CartContents(props) {
  function filterEmptyLineItems(lineItems) {
    return lineItems.filter(Boolean)
  }

  const styles = css`
    top: 38%;
    text-align: center;
    color: #ddd;
    position: absolute;
    margin: 0;
    width: calc(100% - 40px);
    font-size: 1.5em;
    margin: 0;
    text-align: center;
  `

  return (
    <section
      className='wps-cart-contents'
      data-is-cart-empty={props.isCartEmpty}
      data-wps-is-ready={props.isCartReady ? '1' : '0'}>
      {props.isCartEmpty ? (
        <h2 css={styles}>
          {wp.hooks.applyFilters(
            'cart.empty.text',
            __('Your cart is empty', wpshopify.misc.textdomain)
          )}
        </h2>
      ) : (
        <CartLineItems lineItems={filterEmptyLineItems(props.checkoutCache.variants)} />
      )}
    </section>
  )
}

export default CartContents
