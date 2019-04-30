import React from 'react'
import { CartReducer } from './reducer'
import { CartInitialState } from './initial-state'
import { CartContext } from './context'

function CartProvider(props) {
   const [state, dispatch] = React.useReducer(CartReducer, CartInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <CartContext.Provider value={value} {...props} />
}

export { CartProvider }
