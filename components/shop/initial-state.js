function ShopInitialState(props = false) {

   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      isReady: false,
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.00
      },
      isCartEmpty: true
   }

}

export {
   ShopInitialState
}