import React, { useContext } from 'react'
import { SearchContext } from '../../_state/context'

function SearchNotices({ isLoading }) {
   const [searchState] = useContext(SearchContext)

   return <div className='is-loading'>{searchState.isLoading ? 'Loading ⌛️' : ''}</div>
}

export { SearchNotices }
