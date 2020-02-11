import { CartButtonReducer } from './reducer'
import { CartButtonInitialState } from './initial-state'
import { CartButtonContext } from './context'

function CartButtonProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    CartButtonReducer,
    CartButtonInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <CartButtonContext.Provider value={value} {...props} />
}

export { CartButtonProvider }
