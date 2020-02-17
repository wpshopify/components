function CollectionsInitialState(options) {
  return {
    payloadSettings: options.payloadSettings ? options.payloadSettings : false,
    payload: options.payload ? options.payload : [],
    element: options.element ? options.element : false,
    isLoading: false
  }
}

export { CollectionsInitialState }
