import { ProductReducer } from './reducer'
import { ProductInitialState } from './initial-state'
import { ProductContext } from './context'

function ProductProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductReducer,
    ProductInitialState(props.payload)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductContext.Provider value={value} {...props} />
}

export { ProductProvider }
