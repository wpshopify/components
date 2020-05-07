function CartButtonInitialState(options) {
  return {
    element: options.element,
    renderFromServer: options.payloadSettings.renderFromServer,
    payloadSettings: options.payloadSettings,
  }
}

export { CartButtonInitialState }
