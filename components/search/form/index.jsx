import React, { useContext, useEffect } from 'react'
import { queryProducts, fetchByTitleParams } from '@wpshopify/api'
import { useDebounce } from 'use-debounce'
import { DropZone } from '../../dropzone'
import { LoadingContext } from '../../../common/state/context'
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

   const [debouncedSearchTerm] = useDebounce(searchState.searchTerm, 300)

   useEffect(() => {
      searchDispatch({ type: 'SET_IS_FIRST_RENDER', payload: false })
   }, [])

   useEffect(() => {
      console.log('debouncedSearchTerm', debouncedSearchTerm)
      console.log('searchState.isFirstRender', searchState.isFirstRender)

      if (!searchState.isFirstRender) {
         getSearchResults()
         return
      }
   }, [debouncedSearchTerm])

   /*

   Get products on search change

   */
   async function getSearchResults() {
      searchDispatch({ type: 'SET_IS_LOADING', payload: true })

      const results = await fetchProducts(debouncedSearchTerm)

      console.log('results', results)

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
