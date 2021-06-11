import { CartReducer } from './reducer';
import { CartInitialState } from './initial-state';
import { CartContext } from './context';

function CartProvider(props) {
  console.log('props', props);

  const [state, dispatch] = wp.element.useReducer(
    CartReducer,
    CartInitialState(
      props.cartOptions,
      props.productOptions,
      props.storefrontOptions,
      props.searchtOptions
    )
  );

  const value = wp.element.useMemo(() => [state, dispatch], [state]);

  return <CartContext.Provider value={value} {...props} />;
}

export { CartProvider };
