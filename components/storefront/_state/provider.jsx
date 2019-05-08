import React from 'react'
import { StorefrontReducer } from './reducer'
import { StorefrontInitialState } from './initial-state'
import { StorefrontContext } from './context'

function StorefrontProvider(props) {
   const [state, dispatch] = React.useReducer(StorefrontReducer, StorefrontInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <StorefrontContext.Provider value={value} {...props} />
}

export { StorefrontProvider }
