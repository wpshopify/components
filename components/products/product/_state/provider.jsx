import React from 'react'
import { ProductReducer } from './reducer'
import { ProductInitialState } from './initial-state'
import { ProductContext } from './context'

function ProductProvider(props) {
   const [state, dispatch] = React.useReducer(ProductReducer, ProductInitialState(props.payload))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductContext.Provider value={value} {...props} />
}

export { ProductProvider }
