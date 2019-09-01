import React from 'react'
import { AddressesReducer } from './reducer'
import { AddressesInitialState } from './initial-state'
import { AddressesContext } from './context'

function AddressesProvider(props) {
   const [state, dispatch] = React.useReducer(AddressesReducer, AddressesInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <AddressesContext.Provider value={value} {...props} />
}

export { AddressesProvider }
