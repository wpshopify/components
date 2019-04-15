import React, { useContext } from 'react'
import { fetchNextPage } from '@wpshopify/api'
import { FiltersContext } from '../_state/context'

function PaginationNext() {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)

   async function onNextPage() {
      try {
         filtersDispatch({ type: 'SET_IS_LOADING', payload: true })

         var newProducts = await fetchNextPage(filtersState.searchData)

         // setSearchData(filtersState.searchData.concat(newProducts.model))
         filtersDispatch({ type: 'SET_SEARCH_DATA', payload: filtersState.searchData.concat(newProducts.model) })

         // setIsLoading(false)
         filtersDispatch({ type: 'SET_IS_LOADING', payload: false })
      } catch (err) {
         console.log('newProducts ERR', err)
      }
   }

   return (
      <button type='button' disabled={filtersState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
         {filtersState.isLoading ? 'Loading ...' : 'Load more'}
      </button>
   )
}

export { PaginationNext }
