function CustomersInitialState(options) {
   return {
      isReady: false,
      notices: [],
      user: options.user,
      dropzones: options.dropzones,
      customer: false,
      isAccountPage: options.isAccountPage,
      onInnerPage: false,
      selectedOrderDetails: false,
      defaultAddress: false,
      selectedAddress: false
   }
}

export { CustomersInitialState }
