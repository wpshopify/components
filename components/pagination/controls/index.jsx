import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'
import { PaginationControlsProvider } from './_state/provider'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

function afterQueryParam(shopifyResponse, dataType) {
   const data = shopifyResponse.data[dataType]

   if (isEmpty(data.edges)) {
      return {
         after: ''
      }
   }

   return {
      after: first(data.edges).cursor
   }
}

function PaginationControls() {
   console.log('<PaginationControls>')

   return (
      <PaginationControlsProvider>
         <section className='wps-pagination-controls'>
            <PaginationPageSize />
            <PaginationLoadMore />
         </section>
      </PaginationControlsProvider>
   )
}

export { PaginationControls, afterQueryParam }
