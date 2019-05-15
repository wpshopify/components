import React from 'react'
import { CollectionsReducer } from './reducer'
import { CollectionsInitialState } from './initial-state'
import { CollectionsContext } from './context'

function CollectionsProvider(props) {
   const [state, dispatch] = React.useReducer(CollectionsReducer, CollectionsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])
   console.log('<CollectionsProvider>')

   return <CollectionsContext.Provider value={value} {...props} />
}

export { CollectionsProvider }
