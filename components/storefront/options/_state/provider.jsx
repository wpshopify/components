import React from 'react'
import { StorefrontOptionsReducer } from './reducer'
import { StorefrontOptionsInitialState } from './initial-state'
import { StorefrontOptionsContext } from './context'

function StorefrontOptionsProvider(props) {
   const [state, dispatch] = React.useReducer(StorefrontOptionsReducer, StorefrontOptionsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <StorefrontOptionsContext.Provider value={value} {...props} />
}

export { StorefrontOptionsProvider }
