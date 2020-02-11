import { usePortal } from '../../../../common/hooks'
import { StorefrontContext } from '../../_state/context'

const { useContext } = wp.element

function StorefrontFilterOptionsHeading() {
  const [storefrontState] = useContext(StorefrontContext)

  return usePortal(
    <h2 className='wps-storefront-heading'>Filter by</h2>,
    document.querySelector(storefrontState.componentOptions.dropzoneHeading)
  )
}

export { StorefrontFilterOptionsHeading }
