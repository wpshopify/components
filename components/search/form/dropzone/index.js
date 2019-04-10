import React, { useContext } from 'react'
import { SearchContext } from '../../context'
import { DropZone } from '../../../dropzone'
import { LoadingContext } from '../../../../common/state/context'

/*

Component: SearchNotices

*/
function SearchDropzone() {
   const { searchState } = useContext(SearchContext)
   console.log('searchState.dropzoneData length', searchState.dropzoneData.length)

   return searchState.dropzoneData.length > 0 ? (
      <LoadingContext.Provider value={{ isLoading: searchState.isLoading, from: 'search' }}>
         <DropZone dropZone={searchState.componentOptions.dropzone} items={searchState.dropzoneData} />
      </LoadingContext.Provider>
   ) : (
      ''
   )
}

export { SearchDropzone }
