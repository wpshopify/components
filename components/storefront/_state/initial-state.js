function StorefrontInitialState({ element, payloadSettings }) {
  return {
    element: element ? element : false,
    renderFromServer: payloadSettings ? payloadSettings.renderFromServer : false,
    payloadSettings: payloadSettings ? payloadSettings : false,
    selections: {},
    selectedTags: [],
    selectedTypes: [],
    selectedVendors: [],
    selectedAvailableForSale: null,
    hasResults: false,
    isLoading: false,
    hasSelections: false,
  };
}

export { StorefrontInitialState };
