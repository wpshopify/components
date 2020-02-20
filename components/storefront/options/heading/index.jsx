import { usePortal } from '../../../../common/hooks'
import { StorefrontContext } from '../../_state/context'

const { useContext } = wp.element
const { __ } = wp.i18n

function StorefrontFilterOptionsHeading() {
  const [storefrontState] = useContext(StorefrontContext)

  return usePortal(
    <h2 className='wps-storefront-heading'>
      {wp.hooks.applyFilters(
        'storefront.selections.filter.label',
        __('Filter by', wpshopify.misc.textdomain)
      )}
    </h2>,
    document.querySelector(storefrontState.payloadSettings.dropzoneHeading)
  )
}

export { StorefrontFilterOptionsHeading }
