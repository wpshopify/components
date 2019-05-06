import React from 'react'
import { ShopReducer } from './reducer'
import { ShopInitialState } from './initial-state'
import { ShopContext } from './context'

function ShopProvider(props) {
   const [state, dispatch] = React.useReducer(ShopReducer, ShopInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ShopContext.Provider value={value} {...props} />
}

export { ShopProvider }
