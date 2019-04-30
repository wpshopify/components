import React from 'react'
import { CartButtonReducer } from './reducer'
import { CartButtonInitialState } from './initial-state'
import { CartButtonContext } from './context'

function CartButtonProvider(props) {
   const [state, dispatch] = React.useReducer(CartButtonReducer, CartButtonInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <CartButtonContext.Provider value={value} {...props} />
}

export { CartButtonProvider }
