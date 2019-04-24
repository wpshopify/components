import React from 'react'
import { ProductPricingReducer } from './reducer'
import { ProductPricingInitialState } from './initial-state'
import { ProductPricingContext } from './context'

function ProductPricingProvider(props) {
   const [state, dispatch] = React.useReducer(ProductPricingReducer, ProductPricingInitialState(props))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductPricingContext.Provider value={value} {...props} />
}

export { ProductPricingProvider }
