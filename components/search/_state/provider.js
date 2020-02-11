import { SearchReducer } from './reducer'
import { SearchInitialState } from './initial-state'
import { SearchContext } from './context'

function SearchProvider(props) {
  const [state, dispatch] = wp.element.useReducer(SearchReducer, SearchInitialState(props.options))

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <SearchContext.Provider value={value} {...props} />
}

export { SearchProvider }
