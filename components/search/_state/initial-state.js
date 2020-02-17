function SearchInitialState(options = {}) {
  return {
    element: options.element ? options.element : false,
    renderFromServer: options.payloadSettings ? options.payloadSettings.renderFromServer : false,
    payloadSettings: options.payloadSettings ? options.payloadSettings : false
  }
}

export { SearchInitialState }
