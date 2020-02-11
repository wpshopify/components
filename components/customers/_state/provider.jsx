import { CustomersReducer } from './reducer'
import { CustomersInitialState } from './initial-state'
import { CustomersContext } from './context'

function CustomersProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    CustomersReducer,
    CustomersInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <CustomersContext.Provider value={value} {...props} />
}

export { CustomersProvider }
