import { ItemsReducer } from './reducer';
import { ItemsInitialState } from './initial-state';
import { ItemsStateContext, ItemsDispatchContext } from './context';

function ItemsProvider(props) {
  const [state, dispatch] = wp.element.useReducer(ItemsReducer, ItemsInitialState(props));

  //   const value = wp.element.useMemo(() => [state, dispatch], [state]);

  return (
    <ItemsStateContext.Provider value={state}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {props.children}
      </ItemsDispatchContext.Provider>
    </ItemsStateContext.Provider>
  );
}

export { ItemsProvider };
