function CustomersInitialState(options) {
   return {
      isReady: false,
      notices: [],
      user: options.user,
      dropzones: options.dropzones,
      payload: false
   }
}

export { CustomersInitialState }
