function getSearchInitialState(options = {}) {
   return {
      componentID: options.componentID ? options.componentID : false,
      element: options.element ? options.element : false,
      renderFromServer: options.componentOptions ? options.componentOptions.renderFromServer : false,
      componentOptions: options.componentOptions ? options.componentOptions : false,
      isLoading: false,
      dropzoneData: false,
      isFirstRender: false
   }
}

export { getSearchInitialState }
