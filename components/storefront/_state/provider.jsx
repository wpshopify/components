import { StorefrontReducer } from './reducer'
import { StorefrontInitialState } from './initial-state'
import { StorefrontContext } from './context'

function StorefrontProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    StorefrontReducer,
    StorefrontInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <StorefrontContext.Provider value={value} {...props} />
}

export { StorefrontProvider }
