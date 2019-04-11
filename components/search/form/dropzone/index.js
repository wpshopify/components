import React, { useContext } from 'react'
import { SearchContext } from '../../context'
import { Dropzone } from '../../../dropzone'
import { LoadingContext } from '../../../../common/state/context'
import { Products } from '../../../products'

/*

Component: SearchNotices

*/
function SearchDropzone() {
   const { searchState } = useContext(SearchContext)

   function buildOptions(products) {
      return {
         products: products.map(function(product) {
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
         })
      }
   }

   console.log('searchState.componentOptions.dropzone', searchState.componentOptions.dropzone)

   return (
      searchState.dropzoneData.length > 0 && (
         <Dropzone dropzone={searchState.componentOptions.dropzone}>
            <Products options={buildOptions(searchState.dropzoneData)} />
         </Dropzone>
      )
   )
}

export { SearchDropzone }
