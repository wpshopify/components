import React, { useContext, useEffect, useRef, useState } from 'react'
import { usePortal } from '../../../common/hooks'
import { FiltersContext } from '../_state/context'
import { Products } from '../../products'
import { Pagination } from '../../pagination'

/*

Component: SearchNotices

*/
function FilterItems() {
   const [filtersState] = useContext(FiltersContext)
   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)

   console.log('filtersState ................ ::', filtersState)

   function hasNewData() {
      return filtersState.payload.length > 0
   }

   function buildOptions() {
      return {
         payload: filtersState.payload,
         originalPayload: filtersState.payload,
         products: filtersState.payload.map(product => {
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
         originalQueryParams: filtersState.queryParams,
         queryParams: filtersState.queryParams,
         type: 'filters',
         componentOptions: filtersState.componentOptions,
         noResultsText: filtersState.componentOptions.noResultsText
      }
   }

   useEffect(
      function() {
         if (isFirstRender.current) {
            isFirstRender.current = false
            return
         }

         if (!hasNewData()) {
            return
         }

         setShowData(true)
      },
      [filtersState.payload]
   )

   return usePortal(
      showData && (
         <Pagination>
            <Products options={buildOptions()} />
         </Pagination>
      ),
      document.querySelector(filtersState.componentOptions.dropzonePayload)
   )
}

export { FilterItems }
