const { __ } = wp.i18n

function CartInitialState(options) {
  return {
    isUpdating: false,
    isCheckingOut: false,
    isCartOpen: false,
    termsAccepted: true,
    isCartEmpty: true,
    isCartInteractive: false,
    buttons: options,
    notices: [],
    checkoutCache: {
      lineItems: [],
      variants: [],
      total: 0.0
    },
    customAttributes: [],
    note: false,
    totalLineItems: 0,
    title: wp.hooks.applyFilters(
      'default.cart.title',
      __('Shopping cart', wpshopify.misc.textdomain)
    ),
    checkoutText: wp.hooks.applyFilters(
      'default.cart.checkout.text',
      __('Begin checkout', wpshopify.misc.textdomain)
    )
  }
}

export { CartInitialState }
