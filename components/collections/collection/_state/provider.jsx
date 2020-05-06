import { CollectionReducer } from './reducer'
import { CollectionInitialState } from './initial-state'
import { CollectionContext } from './context'

function CollectionProvider(props) {
  const [state, dispatch] = wp.element.useReducer(CollectionReducer, CollectionInitialState(props))

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <CollectionContext.Provider value={value} {...props} />
}

export { CollectionProvider }
