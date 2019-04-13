import React, { useContext, useEffect, useRef, useState } from 'react'
import { SearchContext } from '../../context'
import { Dropzone } from '../../../dropzone'
import { LoadingContext } from '../../../../common/state/context'
import { Products } from '../../../products'

/*

Component: SearchNotices

*/
function SearchDropzone() {
   const { searchState } = useContext(SearchContext)
   const [showData, setShowData] = useState(false)
   const isFirstRender = useRef(true)

   function hasNewData() {
      return searchState.dropzoneData.length > 0
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
            console.log('...... HAS DATA, SHOWING NOW .......')

            setShowData(true)
         }
      },
      [searchState.dropzoneData]
   )

   return (
      showData && (
         <Dropzone dropzone={searchState.componentOptions.dropzone} isLoading={searchState.isLoading}>
            <Products options={buildOptions(searchState.dropzoneData)} />
         </Dropzone>
      )
   )
}

export { SearchDropzone }
