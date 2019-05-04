import React, { useContext, useEffect, useRef, useState } from 'react'
import { SearchContext } from '../../context'
import { Products } from '../../../products'
import { usePortal } from '../../../../common/hooks'

/*

Component: SearchNotices

*/
function SearchDropzone() {
   const { searchState } = useContext(SearchContext)
   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)

   function hasNewData() {
      return searchState.searchData.length > 0
   }

   function buildOptions(products) {
      return {
         products: products.map(product => {
            return {
               product: product,
               componentID: false,
               element: false,
               gid: false,
               excludes: false,
               renderFromServer: false,
               selectedVariant: false,
               componentOptions: false
            }
         }),
         type: 'search',
         noResultsText: searchState.componentOptions.noResultsText
      }
   }

   useEffect(
      function() {
         if (isFirstRender.current) {
            isFirstRender.current = false
            return
         }

         if (hasNewData()) {
            setShowData(true)
         }
      },
      [searchState.searchData]
   )

   return usePortal(showData && <Products options={buildOptions(searchState.searchData)} />, document.querySelector(searchState.componentOptions.dropzone))
}

export { SearchDropzone }
