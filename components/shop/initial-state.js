function ShopInitialState(props = false) {

   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      totalPrice: 0.00
   }

}

export {
   ShopInitialState
}