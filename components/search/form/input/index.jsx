import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../context'
import { useDebounce } from 'use-debounce'

/*

Component: SearchInput

*/
function SearchInput() {
   const [localTerm, setLocalTerm] = useState('')
   const { searchState, searchDispatch } = useContext(SearchContext)
   const [debouncedSearchTerm] = useDebounce(localTerm, 250)

   function setSearchTerm(value) {
      setLocalTerm(value)
   }

   /*
   
   This changes every 300ms when typing
   
   */
   useEffect(() => {
      searchDispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearchTerm })
   }, [debouncedSearchTerm])

   return (
      <>
         <input type='search' id='wps-search-input' name='search' val={localTerm} placeholder='Search the store' aria-label='Search store' onChange={e => setSearchTerm(e.target.value)} />
      </>
   )
}

export { SearchInput }
