import React from 'react'
import { PaginationItemsReducer } from './reducer'
import { PaginationItemsInitialState } from './initial-state'
import { PaginationItemsContext } from './context'

function PaginationItemsProvider(props) {
   const [state, dispatch] = React.useReducer(PaginationItemsReducer, PaginationItemsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <PaginationItemsContext.Provider value={value} {...props} />
}

export { PaginationItemsProvider }
