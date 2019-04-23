import React from 'react'
import { ProductsReducer } from './reducer'
import { ProductsInitialState } from './initial-state'
import { ProductsContext } from './context'

function ProductsProvider(props) {
   const [state, dispatch] = React.useReducer(ProductsReducer, ProductsInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductsContext.Provider value={value} {...props} />
}

export { ProductsProvider }
