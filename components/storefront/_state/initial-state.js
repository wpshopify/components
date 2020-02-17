function StorefrontInitialState(options = {}) {
  return {
    element: options.element ? options.element : false,
    renderFromServer: options.payloadSettings ? options.payloadSettings.renderFromServer : false,
    payloadSettings: options.payloadSettings ? options.payloadSettings : false,
    isLoading: false,
    payload: [], // represents the actual filtered data (Products, collections, etc)
    selections: {},
    selectedTags: [],
    selectedTypes: [],
    selectedVendors: [],
    selectedAvailableForSale: null,
    hasResults: false
  }
}

export { StorefrontInitialState }
