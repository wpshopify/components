import React, { useContext } from 'react'
import { usePortal } from '../../../../common/hooks'
import { StorefrontContext } from '../../_state/context'

function StorefrontFilterOptionsHeading() {
   const [storefrontState] = useContext(StorefrontContext)

   return usePortal(<h2 className='wps-storefront-heading'>Filter by</h2>, document.querySelector(storefrontState.componentOptions.dropzoneHeading))
}

export { StorefrontFilterOptionsHeading }
