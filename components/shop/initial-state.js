function ShopInitialState(props = false) {

   return {
      title: 'Shopping cart',
      cartButtonDropzone: 'wps-cart-button-fixed',
      checkout: { lineItems: [] }
   }

}

export {
   ShopInitialState
}