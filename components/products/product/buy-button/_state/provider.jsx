import React from 'react'
import { ProductBuyButtonReducer } from './reducer'
import { ProductBuyButtonInitialState } from './initial-state'
import { ProductBuyButtonContext } from './context'

function ProductBuyButtonProvider(props) {
   const [state, dispatch] = React.useReducer(ProductBuyButtonReducer, ProductBuyButtonInitialState(props.productState))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductBuyButtonContext.Provider value={value} {...props} />
}

export { ProductBuyButtonProvider }
