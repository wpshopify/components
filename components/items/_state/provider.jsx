import React from 'react'
import { ItemsReducer } from './reducer'
import { ItemsInitialState } from './initial-state'
import { ItemsContext } from './context'

function ItemsProvider(props) {
   const [state, dispatch] = React.useReducer(ItemsReducer, ItemsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ItemsContext.Provider value={value} {...props} />
}

export { ItemsProvider }
