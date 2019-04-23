import React from 'react'
import { PaginationReducer } from './reducer'
import { PaginationInitialState } from './initial-state'
import { PaginationContext } from './context'

function PaginationProvider(props) {
   const [state, dispatch] = React.useReducer(PaginationReducer, PaginationInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <PaginationContext.Provider value={value} {...props} />
}

export { PaginationProvider }
