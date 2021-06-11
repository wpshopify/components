function CartInitialState(cartOptions, productOptions, storefrontOptions, searchOptions) {
  return {
    checkoutId: false,
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
    buildNewCheckout: false,
    beforeDiscountTotal: false,
    checkoutCache: {
      lineItems: [],
      lineItemOptions: [],
      variants: [],
      total: 0.0,
    },
    percentageOff: false,
    amountOff: false,
    productsVisible: productOptions
      ? productOptions.length
      : storefrontOptions
      ? storefrontOptions.length
      : searchOptions
      ? searchOptions.length
      : false,
    shopInfo: false,
    customAttributes: [],
    note: false,
    totalLineItems: 0,
    title: wp.hooks.applyFilters('default.cart.title', wp.i18n.__('Shopping cart', 'wpshopify')),
    checkoutText: wp.hooks.applyFilters(
      'default.cart.checkout.text',
      wp.i18n.__('Begin checkout', 'wpshopify')
    ),
    isRemovingDiscountCode: false,
    isAddingDiscountCode: false,
    isCalculatingTotal: false,
    isAddingLineItems: false,
  };
}

export { CartInitialState };
