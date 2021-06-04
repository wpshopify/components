const CartHeader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartHeader-public' */ '../header')
);

const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents-public' */ '../contents')
);

const CartFooter = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartFooter-public' */ '../footer')
);

function CartContainer({ cartState, cartDispatch }) {
  const { useEffect } = wp.element;

  useEffect(() => {
    wp.hooks.doAction('on.cart.load', cartState);
  }, []);
  return (
    <>
      <CartHeader cartState={cartState} cartDispatch={cartDispatch} />
      <CartContents isCartEmpty={cartState.isCartEmpty} checkoutCache={cartState.checkoutCache} />
      <CartFooter />
    </>
  );
}

export default CartContainer;
