import { CartReducer } from './reducer'
import { CartInitialState } from './initial-state'
import { CartContext } from './context'

function CartProvider(props) {
  const [state, dispatch] = wp.element.useReducer(CartReducer, CartInitialState(props.options))

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <CartContext.Provider value={value} {...props} />
}

export { CartProvider }
