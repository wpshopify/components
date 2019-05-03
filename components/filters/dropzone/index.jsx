import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiltersContext } from '../_state/context'
import { Dropzone } from '../../dropzone'
import { Products } from '../../products'

/*

Component: SearchNotices

*/
function FilterDropzone() {
   const [filtersState] = useContext(FiltersContext)
   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)
   console.log('FilterDropzone', filtersState)

   function hasNewData() {
      return filtersState.payload.length > 0
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
               componentOptions: {
                  pagination: true
               }
            }
         }),
         queryParams: filtersState.filterParams,
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

   return (
      showData && (
         <Dropzone dropzone={filtersState.componentOptions.dropzonePayload}>
            <Products options={buildOptions(filtersState.payload)} />
         </Dropzone>
      )
   )
}

export { FilterDropzone }
