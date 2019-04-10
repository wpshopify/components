import React, { useContext } from 'react'
import { SearchContext } from '../../context'

/*

Component: SearchNotices

*/
function SearchNotices({ isLoading }) {
   const { searchState } = useContext(SearchContext)

   return <div className='is-loading'>{searchState.isLoading ? 'Loading ...' : ''}</div>
}

export { SearchNotices }
