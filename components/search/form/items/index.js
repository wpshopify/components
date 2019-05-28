import React, { useContext, useRef, useEffect } from 'react'
import { SearchContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { Products } from '../../../products'
import { usePortal } from '../../../../common/hooks'

function SearchItems() {
   const [searchState] = useContext(SearchContext)
   const [itemsState] = useContext(ItemsContext)
   const initialRender = useRef(true)

   useEffect(() => {
      if (initialRender.current) {
         initialRender.current = false
         return
      }
   }, [])

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
         dataType: itemsState.componentOptions.dataType,
         originalParams: {
            type: itemsState.componentOptions.dataType,
            queryParams: itemsState.queryParams,
            connectionParams: false
         },
         queryParams: itemsState.queryParams,
         type: itemsState.componentOptions.dataType,
         componentOptions: itemsState.componentOptions,
         noResultsText: itemsState.componentOptions.noResultsText
      }
   }

   return usePortal(<>{!initialRender.current && <Products options={buildOptions()} />}</>, document.querySelector(searchState.componentOptions.dropzonePayload))
}

export { SearchItems }
