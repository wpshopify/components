import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'
import { FilterSelectionsWrapper } from './wrapper'
import { objectIsEmpty } from '../../../common/utils'
import { usePortal } from '../../../common/hooks'

function FilterSelections() {
   const { filtersState } = useContext(FiltersContext)

   return usePortal(!objectIsEmpty(filtersState.selections) ? <FilterSelectionsWrapper /> : '', document.querySelector(filtersState.componentOptions.dropzoneSelections))
}

export { FilterSelections }
