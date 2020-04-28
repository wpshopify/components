import { usePortal } from '../../../../common/hooks'
import { FilterHook, __t } from '../../../../common/utils'
import { StorefrontContext } from '../../_state/context'

const { useContext } = wp.element

function StorefrontFilterOptionsHeading() {
  const [storefrontState] = useContext(StorefrontContext)

  return usePortal(
    <h2 className='wps-storefront-heading'>
      <FilterHook name='storefront.selections.filter.label'>{__t('Filter by')}</FilterHook>
    </h2>,
    document.querySelector(storefrontState.payloadSettings.dropzoneHeading)
  )
}

export { StorefrontFilterOptionsHeading }
