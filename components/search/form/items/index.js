import React, { useContext } from 'react'
import { SearchContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'

import { Products } from '../../../products'
import { usePortal } from '../../../../common/hooks'

function SearchItems() {
   const [searchState] = useContext(SearchContext)
   const [itemsState] = useContext(ItemsContext)

   function buildOptions() {
      return {
         payload: itemsState.payload,
         products: itemsState.payload.map(product => {
            return {
               product: product,
               componentID: false,
               element: false,
               gid: false,
               excludes: false,
               renderFromServer: false,
               selectedVariant: false,
               componentOptions: {
                  pagination: true
               }
            }
         }),
         dataType: 'products',
         originalParams: {
            type: 'products',
            queryParams: itemsState.queryParams,
            connectionParams: false
         },
         queryParams: itemsState.queryParams,
         type: 'search',
         componentOptions: itemsState.componentOptions,
         noResultsText: itemsState.componentOptions.noResultsText
      }
   }

   return usePortal(<Products options={buildOptions()} />, document.querySelector(searchState.componentOptions.dropzonePayload))
}

export { SearchItems }
