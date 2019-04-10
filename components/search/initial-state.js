function getSearchInitialState(options) {
   return {
      componentID: options.componentID,
      element: options.element,
      renderFromServer: options.componentOptions.renderFromServer,
      componentOptions: options.componentOptions,
      isLoading: false,
      dropzoneData: false,
      isFirstRender: false
   }
}

export { getSearchInitialState }
