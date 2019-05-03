import React from 'react'
import { FiltersReducer } from './reducer'
import { FiltersInitialState } from './initial-state'
import { FiltersContext } from './context'

function FiltersProvider(props) {
   const [state, dispatch] = React.useReducer(FiltersReducer, FiltersInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <FiltersContext.Provider value={value} {...props} />
}

export { FiltersProvider }
