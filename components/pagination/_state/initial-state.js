function PaginationInitialState(options) {
  return {
    element: options.element,
    payloadSettings: options.payloadSettings,
    type: 'list',
    isLoading: false,
    hasResults: false,
    controlsTouched: false
  }
}

export { PaginationInitialState }
