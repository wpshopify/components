import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'
import { PaginationControlsProvider } from './_state/provider'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'
import has from 'lodash/has'

function afterQueryParam(shopifyResponse, dataType) {
   var data = false

   if (has(shopifyResponse.data, dataType)) {
      data = shopifyResponse.data[dataType]
   }

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
