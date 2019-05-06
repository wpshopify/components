import React, { useContext, useEffect, useRef, useState } from 'react'
import { usePortal } from '../../../common/hooks'
import { FiltersContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { Products } from '../../products'
import { Pagination } from '../../pagination'

/*

Component: SearchNotices

*/
function FilterItems() {
   const [filtersState] = useContext(FiltersContext)
   const [shopState] = useContext(ShopContext)

   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)

   function hasNewData() {
      return filtersState.payload.length > 0
   }

   function buildOptions() {
      return {
         payload: filtersState.payload,
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
         originalQueryParams: shopState.queryParams.products,
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

   return usePortal(showData && <Products options={buildOptions()} />, document.querySelector(filtersState.componentOptions.dropzonePayload))
}

export { FilterItems }
