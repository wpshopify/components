function CartInitialState(options) {
  return {
    isUpdating: false,
    isCheckingOut: false,
    isCartOpen: false,
    termsAccepted: true,
    isCartEmpty: true,
    isCartLoaded: false,
    isCartInteractive: false,
    isCartReady: false,
    buttons: options,
    notices: [],
    checkoutCache: {
      lineItems: [],
      variants: [],
      total: 0.0,
    },
    shopInfo: false,
    customAttributes: [],
    note: false,
    totalLineItems: 0,
    title: wp.hooks.applyFilters('default.cart.title', wp.i18n.__('Shopping cart', 'wpshopify')),
    checkoutText: wp.hooks.applyFilters(
      'default.cart.checkout.text',
      wp.i18n.__('Begin checkout', 'wpshopify')
    ),
  }
}

export { CartInitialState }
