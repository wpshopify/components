function CartButtonInitialState(options) {
  console.log('options.payloadSettings', options.payloadSettings)

  return {
    element: options.element,
    renderFromServer: options.payloadSettings.renderFromServer,
    payloadSettings: options.payloadSettings,
  }
}

export { CartButtonInitialState }
