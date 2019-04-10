import React, { useContext } from 'react'
import { SearchContext } from '../../context'

/*

Component: SearchInput

*/
function SearchInput() {
   const { searchState, searchDispatch } = useContext(SearchContext)

   function setSearchTerm(value) {
      searchDispatch({ type: 'SET_SEARCH_TERM', payload: value })
   }

   return (
      <>
         <input
            type='search'
            id='wps-search-input'
            name='search'
            val={searchState.debouncedSearchTerm}
            placeholder='Search the store'
            aria-label='Search store'
            onChange={e => setSearchTerm(e.target.value)}
         />
      </>
   )
}

export { SearchInput }
