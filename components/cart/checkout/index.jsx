import ErrorFallback from '../../error-fallback';
import { ErrorBoundary } from 'react-error-boundary';
import { CartContext } from '../_state/context';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { useCheckout } from './common';
import CartCheckoutButton from './button';

function CartCheckout() {
  const { useContext } = wp.element;
  const [cartState, cartDispatch] = useContext(CartContext);

  const checkoutQuery = useCheckout(cartState, cartDispatch, function afterRedirect() {
    cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false });
    cartDispatch({ type: 'UPDATE_NOTICES', payload: [] });
  });

  return (
    <>
      <FilterHook name='before.cart.checkout.button' hasHTML={true} args={[cartState]} />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CartCheckoutButton />
      </ErrorBoundary>

      <FilterHook name='after.cart.checkout.button' hasHTML={true} args={[cartState]} />
    </>
  );
}

export default CartCheckout;
