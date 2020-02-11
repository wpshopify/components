import { AddressesReducer } from './reducer'
import { AddressesInitialState } from './initial-state'
import { AddressesContext } from './context'

function AddressesProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    AddressesReducer,
    AddressesInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <AddressesContext.Provider value={value} {...props} />
}

export { AddressesProvider }
