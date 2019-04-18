import React, { useContext } from 'react'
import { FiltersContext } from '../../_state/context'

function PaginationPageSize() {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)

   function updateFetchParams(event) {
      return {
         first: parseInt(event.target.value)
      }
   }
   function onChange(event) {
      filtersDispatch({ type: 'SET_FILTER_PARAMS', payload: updateFetchParams(event) })
   }

   return (
      <div className='wps-component wps-component-sorting'>
         <label className='wps-sorting-heading' htmlFor='wps-sorting'>
            Page size:
         </label>

         <select value={filtersState.filterParams.first} id='wps-sorting' onChange={e => onChange(e)}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50' data-wps-reverse>
               50
            </option>
            <option value='100'>100</option>
            <option value='250' data-wps-reverse>
               250
            </option>
         </select>
      </div>
   )
}

export { PaginationPageSize }
