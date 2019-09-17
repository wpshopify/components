import React from 'react'
import { BuilderReducer } from './reducer'
import { BuilderInitialState } from './initial-state'
import { BuilderContext } from './context'

function BuilderProvider(props) {
   const [state, dispatch] = React.useReducer(BuilderReducer, BuilderInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <BuilderContext.Provider value={value} {...props} />
}

export { BuilderProvider }
