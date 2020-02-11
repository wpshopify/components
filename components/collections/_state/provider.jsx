import { CollectionsReducer } from './reducer'
import { CollectionsInitialState } from './initial-state'
import { CollectionsContext } from './context'

function CollectionsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    CollectionsReducer,
    CollectionsInitialState(props.options)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <CollectionsContext.Provider value={value} {...props} />
}

export { CollectionsProvider }
