import React from 'react'
import { CustomersReducer } from './reducer'
import { CustomersInitialState } from './initial-state'
import { CustomersContext } from './context'

function CustomersProvider(props) {
   const [state, dispatch] = React.useReducer(CustomersReducer, CustomersInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <CustomersContext.Provider value={value} {...props} />
}

export { CustomersProvider }
