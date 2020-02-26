import { CartLineItems } from '../lineitems'
const { Notice } = wp.components
const { __ } = wp.i18n

function CartContents(props) {
  function filterEmptyLineItems(lineItems) {
    return lineItems.filter(Boolean)
  }

  return (
    <section
      className='wps-cart-contents'
      data-is-cart-empty={props.isCartEmpty}
      data-wps-is-ready={props.isCartReady ? '1' : '0'}>
      {props.isCartEmpty ? (
        <Notice status='info' isDismissible='false'>
          {wp.hooks.applyFilters(
            'cart.empty.text',
            __('🛒 Your cart is empty', wpshopify.misc.textdomain)
          )}
        </Notice>
      ) : (
        <CartLineItems lineItems={filterEmptyLineItems(props.checkoutCache.variants)} />
      )}
    </section>
  )
}

export default CartContents
