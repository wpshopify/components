function CartInitialState(cartOptions, productOptions) {
  return {
    isUpdating: false,
    isCheckingOut: false,
    isCartOpen: false,
    termsAccepted: true,
    isCartEmpty: true,
    isCartLoaded: false,
    isCartInteractive: false,
    isCartReady: false,
    buttons: cartOptions,
    notices: [],
    discountCode: false,
    total: 0,
    beforeDiscountTotal: false,
    checkoutCache: {
      lineItems: [],
      variants: [],
      total: 0.0,
    },
    productsVisible: productOptions ? productOptions.length : false,
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
