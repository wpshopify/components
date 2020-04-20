import { ItemsReducer } from './reducer'
import { ItemsInitialState } from './initial-state'
import { ItemsContext } from './context'

function ItemsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(ItemsReducer, ItemsInitialState(props))

  return <ItemsContext.Provider value={[state, dispatch]} {...props} />
}

export { ItemsProvider }
