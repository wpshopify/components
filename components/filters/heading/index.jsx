import React, { useContext } from 'react'
import { usePortal } from '../../../common/hooks'
import { FiltersContext } from '../_state/context'

function FilterHeading() {
   const { filtersState } = useContext(FiltersContext)

   return usePortal(<h2 className='wps-filters-heading'>Filter by</h2>, document.querySelector(filtersState.componentOptions.dropzoneHeading))
}

export { FilterHeading }
