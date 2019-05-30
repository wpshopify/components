function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      buttons: options,
      title: options.title ? options.title : 'Shopping cart',
      checkoutText: options.checkoutText ? options.checkoutText : 'Begin checkout'
   }
}

export { CartInitialState }
