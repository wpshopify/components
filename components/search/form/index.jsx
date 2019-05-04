import React, { useContext, useEffect } from 'react'
import { queryProducts, fetchByTitleParams } from '@wpshopify/api'
import { SearchContext } from '../context'
import { usePortal } from '../../../common/hooks'
import { SearchInput } from './input'
import { SearchButton } from './button'
import { SearchNotices } from './notices'

function fetchProducts(searchTerm) {
   return queryProducts(fetchByTitleParams(searchTerm))
}

/*

Component: SearchForm

*/
function SearchForm() {
   const { searchState, searchDispatch } = useContext(SearchContext)

   useEffect(() => {
      searchDispatch({ type: 'SET_IS_FIRST_RENDER', payload: false })
   }, [])

   useEffect(() => {
      if (searchState.isFirstRender) {
         return
      }

      getSearchResults()
   }, [searchState.searchTerm])

   /*

   Get products on search change

   */
   async function getSearchResults() {
      searchDispatch({ type: 'SET_IS_LOADING', payload: true })

      const results = await fetchProducts(searchState.searchTerm)

      searchDispatch({ type: 'SET_DROPZONE_DATA', payload: results })
      searchDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   return usePortal(
      <form role='search' className='wps-search-form'>
         <SearchNotices />

         <div className='wps-search-wrapper'>
            <SearchInput />
            <SearchButton />
         </div>
      </form>,
      searchState.element
   )
}

export { SearchForm }
