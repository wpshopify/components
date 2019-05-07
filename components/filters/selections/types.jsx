import React, { useContext } from 'react'
import { FilterSelectionsValues } from './values'
import { FiltersContext } from '../_state/context'
import { getSelectionTypes } from '../../../common/selections'
import isEmpty from 'lodash/isEmpty'

function FilterSelectionsType({ selectionType }) {
   const [filtersState] = useContext(FiltersContext)

   return (
      !isEmpty(filtersState.selections[selectionType]) && (
         <div className='wps-filter-selection-type wps-row wps-mb-2'>
            <div className='wps-selections-group wps-align-items-center'>
               <span className='wps-filter-selection-type-heading'>{selectionType}: </span>
               <FilterSelectionsValues selectionType={selectionType} vals={filtersState.selections[selectionType]} />
            </div>
         </div>
      )
   )
}

function FilterSelectionsTypes() {
   const [filtersState] = useContext(FiltersContext)

   const selectionTypes = getSelectionTypes(filtersState.selections)

   return selectionTypes.map((selectionType, index) => <FilterSelectionsType key={index} selectionType={selectionType} />)
}

export { FilterSelectionsTypes }
