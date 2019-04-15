import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiltersContext } from '../_state/context'
import { Dropzone } from '../../dropzone'
import { Products } from '../../products'

/*

Component: SearchNotices

*/
function FilterDropzone() {
   const { filtersState } = useContext(FiltersContext)
   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)

   function hasNewData() {
      return filtersState.filterData.length > 0
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
         noResultsText: filtersState.componentOptions.noResultsText
      }
   }

   useEffect(
      function() {
         if (isFirstRender.current) {
            isFirstRender.current = false
            return
         }

         if (hasNewData()) {
            console.log('...... HAS FILTERS DATA, SHOWING NOW .......')

            setShowData(true)
         }
      },
      [filtersState.filterData]
   )

   return (
      showData && (
         <Dropzone dropzone={filtersState.componentOptions.filterData} isLoading={filtersState.isLoading}>
            <Products options={buildOptions(filtersState.filterData)} />
         </Dropzone>
      )
   )
}

export { FilterDropzone }
