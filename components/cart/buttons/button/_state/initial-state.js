function CartButtonInitialState(options) {
  return {
    element: options.element,
    renderFromServer: options.componentOptions.renderFromServer,
    componentOptions: options.componentOptions
  }
}

export { CartButtonInitialState }
