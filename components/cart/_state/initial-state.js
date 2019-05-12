function CartInitialState(options) {
   console.log('options', options)

   return {
      cartOpen: null,
      isUpdating: false,
      buttons: options,
      title: options.title ? options.title : 'Shopping cart',
      checkoutText: options.checkoutText ? options.checkoutText : 'Begin checkout'
   }
}

export { CartInitialState }
