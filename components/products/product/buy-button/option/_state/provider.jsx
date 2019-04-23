import React from 'react'
import { ProductOptionReducer } from './reducer'
import { ProductOptionInitialState } from './initial-state'
import { ProductOptionContext } from './context'

function ProductOptionProvider(props) {
   const [state, dispatch] = React.useReducer(ProductOptionReducer, ProductOptionInitialState(props.options))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductOptionContext.Provider value={value} {...props} />
}

export { ProductOptionProvider }
