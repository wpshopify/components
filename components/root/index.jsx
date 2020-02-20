const { __ } = wp.i18n

function RootElement({ payloadSettingsId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-payload-settings={payloadSettingsId}>
      {wp.hooks.applyFilters('global.loading.text', __(loadingMsg, wpshopify.misc.textdomain))}
    </div>
  )
}

export { RootElement }
