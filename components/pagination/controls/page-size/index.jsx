import React, { useContext, useState } from 'react'
import { graphQuery, findLastCursorId } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'

import to from 'await-to-js'

function PaginationPageSize() {
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [pageSize, setPageSize] = useState(defaultPageSize())

   function defaultPageSize() {
      if (itemsState.queryParams.first < 10) {
         return 'DEFAULT'
      }

      return itemsState.queryParams.first
   }

   function updatedFirstQueryParams(event) {
      return {
         first: parseInt(event.target.value)
      }
   }

   function setTotalItemsShown(itemsToAdd) {
      itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: itemsToAdd })
   }

   function setLoadingStates(isLoading) {
      itemsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
   }

   function setPayloadStates(payload) {
      itemsDispatch({ type: 'UPDATE_PAYLOAD', payload: payload })
   }

   function setAfterCursorQueryParams(params) {
      itemsDispatch({ type: 'SET_QUERY_PARAMS', payload: params })
   }
   function setControlsTouched(touched) {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: touched })
   }

   async function onChange(event) {
      setControlsTouched(true)
      setPageSize(event.target.value)

      let updatedParams = updatedFirstQueryParams(event)

      setAfterCursorQueryParams(updatedParams)

      setLoadingStates(true)

      // Calls Shopify
      const [shopifyError, shopifyResponse] = await to(graphQuery(itemsState.dataType, updatedParams))

      if (shopifyError) {
         itemsDispatch({ type: 'UPDATE_NOTICES', payload: { type: 'error', message: shopifyError } })
      } else {
         setAfterCursorQueryParams(findLastCursorId(shopifyResponse, itemsState.dataType))

         setTotalItemsShown(shopifyResponse.model.products.length)
         setPayloadStates(shopifyResponse.model.products)
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   return usePortal(
      <>
         {paginationState.componentOptions.paginationPageSize && (
            <div className='wps-component wps-component-sorting'>
               <label className='wps-sorting-heading wps-mr-2' htmlFor='wps-sorting'>
                  Page size:
               </label>

               <select className='wps-input' value={pageSize} id='wps-sorting' onChange={e => onChange(e)} disabled={itemsState.isLoading}>
                  <option value='DEFAULT' disabled='disabled'>
                     Choose a size
                  </option>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                  <option value='250'>250</option>
               </select>
            </div>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzonePageSize)
   )
}

export { PaginationPageSize }
