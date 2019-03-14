function CartInitialState(checkout, props) {

   return {
      title: 'Shopping cart',
      cartButtonDropzone: 'wps-cart-button-fixed',
      cartOpen: null,
      totalPrice: checkout.totalPrice,
      isUpdating: false
   }

}

export {
   CartInitialState
}