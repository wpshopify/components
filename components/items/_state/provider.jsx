import { ItemsReducer } from './reducer';
import { ItemsInitialState } from './initial-state';
import { ItemsContext } from './context';

function ItemsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(ItemsReducer, ItemsInitialState(props));

  const value = wp.element.useMemo(() => [state, dispatch], [state]);

  return <ItemsContext.Provider value={value} {...props} />;
}

export { ItemsProvider };
