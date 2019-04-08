function CartInitialState(shopState, props) {
   console.log('props!!!!!!!!!!!!!!!!!', props)
   console.log('props.cartIcons', props.cartIcons)

   return {
      title: 'Shopping cart',
      cartButtonDropzone: 'wps-cart-button-fixed',
      cartIcons: props.cartIcons,
      cartOpen: null,
      isUpdating: false
   }
}

export { CartInitialState }
