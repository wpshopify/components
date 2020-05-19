/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartLineItems } from '../lineitems'
import { FilterHook } from '../../../common/utils'

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
    <section className='wps-cart-contents' data-is-cart-empty={props.isCartEmpty}>
      {props.isCartEmpty ? (
        <h2 css={styles}>
          <FilterHook name='cart.empty.text'>
            {wp.i18n.__('Your cart is empty', 'wpshopify')}
          </FilterHook>
        </h2>
      ) : (
        <CartLineItems lineItems={filterEmptyLineItems(props.checkoutCache.variants)} />
      )}
    </section>
  )
}

export default CartContents
