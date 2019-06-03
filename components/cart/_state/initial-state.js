function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      termsAccepted: true,
      buttons: options,
      title: wp.hooks.applyFilters('default.cart.title', 'Shopping cart'),
      checkoutText: wp.hooks.applyFilters('default.cart.checkout.text', 'Begin checkout')
   }
}

export { CartInitialState }
