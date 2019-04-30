import React, { useContext, useState } from 'react'
import { graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationControlsContext } from '../_state/context'
import { PaginationItemsContext } from '../../items/_state/context'
import { afterQueryParam } from '../index'
import { usePortal } from '../../../../common/hooks'

function PaginationPageSize() {
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [paginationItemsState, paginationItemsDispatch] = useContext(PaginationItemsContext)
   const [paginationControlsState, paginationControlsDispatch] = useContext(PaginationControlsContext)
   const [pageSize, setPageSize] = useState(defaultPageSize())

   function defaultPageSize() {
      if (paginationState.queryParams.first < 10) {
         return 'DEFAULT'
      }

      return paginationState.queryParams.first
   }

   function updatedFirstQueryParams(event) {
      return {
         first: parseInt(event.target.value)
      }
   }

   function setLoadingStates(isLoading) {
      paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
   }

   function setPayloadStates(payload) {
      paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: payload })
      paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: payload })
   }

   function setAfterCursorQueryParams(params) {
      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: params })
   }

   async function onChange(event) {
      setPageSize(event.target.value)

      let updatedParams = updatedFirstQueryParams(event)

      setAfterCursorQueryParams(updatedParams)

      setLoadingStates(true)

      // Calls Shopify
      const shopifyResponse = await graphQuery(paginationState.dataType, updatedParams)

      setAfterCursorQueryParams(afterQueryParam(shopifyResponse, paginationState.dataType))

      setPayloadStates(shopifyResponse.model.products)

      paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   return usePortal(
      <div className='wps-component wps-component-sorting'>
         <label className='wps-sorting-heading' htmlFor='wps-sorting'>
            Page size:
         </label>

         <select className='wps-input' value={pageSize} id='wps-sorting' onChange={e => onChange(e)} disabled={paginationControlsState.isLoading}>
            <option value='DEFAULT' disabled='disabled'>
               Choose a size
            </option>
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
