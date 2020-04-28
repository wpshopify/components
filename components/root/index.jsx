import { FilterHook, __t } from '../../common/utils'

function RootElement({ payloadSettingsId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-payload-settings={payloadSettingsId}>
      <FilterHook name='global.loading.text'>{__t(loadingMsg)}</FilterHook>
    </div>
  )
}

export { RootElement }
