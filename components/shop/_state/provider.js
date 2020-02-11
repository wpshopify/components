import { ShopReducer } from './reducer'
import { ShopInitialState } from './initial-state'
import { ShopContext } from './context'

function ShopProvider(props) {
  const [state, dispatch] = wp.element.useReducer(ShopReducer, ShopInitialState(props.options))

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ShopContext.Provider value={value} {...props} />
}

export { ShopProvider }
