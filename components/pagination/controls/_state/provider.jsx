import React from 'react'
import { PaginationControlsReducer } from './reducer'
import { PaginationControlsInitialState } from './initial-state'
import { PaginationControlsContext } from './context'

function PaginationControlsProvider(props) {
   const [state, dispatch] = React.useReducer(PaginationControlsReducer, PaginationControlsInitialState())

   const value = React.useMemo(() => [state, dispatch], [state])

   return <PaginationControlsContext.Provider value={value} {...props} />
}

export { PaginationControlsProvider }
