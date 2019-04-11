function CartInitialState(options) {
   return {
      title: 'Shopping cart',
      cartOpen: null,
      isUpdating: false,
      buttons: options
   }
}

export { CartInitialState }
