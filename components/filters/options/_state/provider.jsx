import React from 'react'
import { FiltersOptionsReducer } from './reducer'
import { FiltersOptionsInitialState } from './initial-state'
import { FiltersOptionsContext } from './context'

function FiltersOptionsProvider(props) {
   const [state, dispatch] = React.useReducer(FiltersOptionsReducer, FiltersOptionsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <FiltersOptionsContext.Provider value={value} {...props} />
}

export { FiltersOptionsProvider }
