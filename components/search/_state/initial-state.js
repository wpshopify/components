function SearchInitialState(options = {}) {
  return {
    element: options.element ? options.element : false,
    renderFromServer: options.componentOptions ? options.componentOptions.renderFromServer : false,
    componentOptions: options.componentOptions ? options.componentOptions : false
  }
}

export { SearchInitialState }
