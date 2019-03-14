function CartInitialState(props = false) {

   return {
      title: 'Shopping cart',
      cartButtonDropzone: 'wps-cart-button-fixed',
      cartOpen: null,
      totalPrice: 0.00
   }

}

export {
   CartInitialState
}