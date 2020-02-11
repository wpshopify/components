import { ProductBuyButtonReducer } from './reducer'
import { ProductBuyButtonInitialState } from './initial-state'
import { ProductBuyButtonContext } from './context'

function ProductBuyButtonProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductBuyButtonReducer,
    ProductBuyButtonInitialState(props.productState)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductBuyButtonContext.Provider value={value} {...props} />
}

export { ProductBuyButtonProvider }
