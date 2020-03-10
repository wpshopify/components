import { usePortal } from '../../../../common/hooks'
import { FilterHook } from '../../../../common/utils'
import { StorefrontContext } from '../../_state/context'

const { useContext } = wp.element
const { __ } = wp.i18n

function StorefrontFilterOptionsHeading() {
  const [storefrontState] = useContext(StorefrontContext)

  return usePortal(
    <h2 className='wps-storefront-heading'>
      <FilterHook name='storefront.selections.filter.label'>
        {__('Filter by', wpshopify.misc.textdomain)}
      </FilterHook>
    </h2>,
    document.querySelector(storefrontState.payloadSettings.dropzoneHeading)
  )
}

export { StorefrontFilterOptionsHeading }
