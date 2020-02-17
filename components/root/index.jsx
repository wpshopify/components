function RootElement({ payloadSettingsId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-payload-settings={payloadSettingsId}>
      {loadingMsg}
    </div>
  )
}

export { RootElement }
