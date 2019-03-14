function ShopInitialState(props = false) {

   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      isReady: false,
      checkoutCache: {
         lineItems: [],
         variants: []
      }
   }

}

export {
   ShopInitialState
}