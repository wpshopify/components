import { ProductPricingReducer } from './reducer'
import { ProductPricingInitialState } from './initial-state'
import { ProductPricingContext } from './context'

function ProductPricingProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductPricingReducer,
    ProductPricingInitialState(props)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductPricingContext.Provider value={value} {...props} />
}

export { ProductPricingProvider }
