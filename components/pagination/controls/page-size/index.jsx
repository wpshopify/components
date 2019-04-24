import React, { useContext, useState } from 'react'
import { graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationControlsContext } from '../_state/context'
import { PaginationItemsContext } from '../../items/_state/context'

import { usePortal } from '../../../../common/hooks'
import update from 'immutability-helper'

function PaginationPageSize() {
   console.log('<PaginationPageSize>')
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

   function updateQueryParams(event) {
      return {
         first: parseInt(event.target.value)
      }
   }

   function afterQueryParam(shopifyResponse) {
      console.log('shopifyResponse.data.products.edges[0].cursor', shopifyResponse.data.products.edges[0].cursor)

      return {
         after: shopifyResponse.data.products.edges[0].cursor
      }
   }

   async function onChange(event) {
      const newParams = updateQueryParams(event)

      setPageSize(event.target.value)
      // console.log('onChange :: newParams', newParams)
      // console.log('onChange :: paginationState.queryParams', paginationState.queryParams)

      const updatedParams = update(paginationState.queryParams, { $merge: newParams })
      console.log('newParams', newParams)

      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: updatedParams })

      console.log('.............. updatedParams ..............', updatedParams)

      paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

      // Calls Shopify
      const shopifyResponse = await graphQuery('products', updatedParams)

      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(shopifyResponse) })

      paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: shopifyResponse.model.products })
      paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })

      paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: shopifyResponse.model.products })
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
