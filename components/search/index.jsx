import React, { useReducer, useEffect } from 'react'

import { SearchForm } from './form'
import { SearchDropzone } from './form/dropzone'

import { getSearchInitialState } from './initial-state'
import { SearchReducer } from './reducer'
import { SearchContext } from './context'

// function searchDefaultProps() {
//    return {
//       dropZone: false
//    }
// }

/*

Component: Search

*/
function Search({ options }) {
   const [state, dispatch] = useReducer(SearchReducer, getSearchInitialState(options))

   useEffect(function() {
      console.log('INITAL Search RENDER')
   }, [])

   return (
      <>
         <SearchContext.Provider
            value={{
               searchState: state,
               searchDispatch: dispatch
            }}>
            <SearchForm />
            <SearchDropzone />
         </SearchContext.Provider>
      </>
   )
}

// Search.defaultProps = searchDefaultProps()

export { Search }
