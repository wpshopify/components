import { ProductVariantButtonsReducer } from './reducer'
import { ProductVariantButtonsInitialState } from './initial-state'
import { ProductVariantButtonsContext } from './context'

function ProductVariantButtonsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductVariantButtonsReducer,
    ProductVariantButtonsInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductVariantButtonsContext.Provider value={value} {...props} />
}

export { ProductVariantButtonsProvider }
