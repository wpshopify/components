function PaginationInitialState(options) {
   return {
      element: options.element,
      componentOptions: options.componentOptions,
      type: 'list',
      isLoading: false,
      hasResults: false,
      controlsTouched: false
   }
}

export { PaginationInitialState }
