import { FilterHook } from '../../common/utils'

const { __ } = wp.i18n

function RootElement({ payloadSettingsId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-payload-settings={payloadSettingsId}>
      <FilterHook name='global.loading.text'>
        {__(loadingMsg, wpshopify.misc.textdomain)}
      </FilterHook>
    </div>
  )
}

export { RootElement }
