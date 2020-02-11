import { PaginationReducer } from './reducer'
import { PaginationInitialState } from './initial-state'
import { PaginationContext } from './context'

function PaginationProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    PaginationReducer,
    PaginationInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <PaginationContext.Provider value={value} {...props} />
}

export { PaginationProvider }
