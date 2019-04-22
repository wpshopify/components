import React, { useContext } from 'react'
import { PaginationContext } from '../_state/context'
import { usePortal } from '../../../common/hooks'

function PaginationPageSize() {
   const { paginationState, paginationDispatch } = useContext(PaginationContext)

   function updateQueryParams(event) {
      return {
         first: parseInt(event.target.value)
      }
   }

   function onChange(event) {
      const newParams = updateQueryParams(event)

      console.log('newParams', newParams)

      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: newParams })
   }

   return usePortal(
      <div className='wps-component wps-component-sorting'>
         <label className='wps-sorting-heading' htmlFor='wps-sorting'>
            Page size:
         </label>

         <select className='wps-input' value={paginationState.queryParams.first} id='wps-sorting' onChange={e => onChange(e)} disabled={paginationState.isLoading}>
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
      </div>,
      document.querySelector(paginationState.componentOptions.dropzonePageSize)
   )
}

export { PaginationPageSize }
