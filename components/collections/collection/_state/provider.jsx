import React from 'react'
import { CollectionReducer } from './reducer'
import { CollectionInitialState } from './initial-state'
import { CollectionContext } from './context'

function CollectionProvider(props) {
   const [state, dispatch] = React.useReducer(CollectionReducer, CollectionInitialState(props.payload))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <CollectionContext.Provider value={value} {...props} />
}

export { CollectionProvider }
