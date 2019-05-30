function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      termsAccepted: true,
      buttons: options,
      title: 'Shopping cart',
      checkoutText: 'Begin checkout'
   }
}

export { CartInitialState }
