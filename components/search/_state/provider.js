import React from 'react'
import { SearchReducer } from './reducer'
import { SearchInitialState } from './initial-state'
import { SearchContext } from './context'

function SearchProvider(props) {
   const [state, dispatch] = React.useReducer(SearchReducer, SearchInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <SearchContext.Provider value={value} {...props} />
}

export { SearchProvider }
