import { CartProvider } from './_state/provider'

const CartWrapper = wp.element.lazy(() => import(/* webpackChunkName: 'CartWrapper' */ './wrapper'))

function Cart({ options }) {
  return (
    <CartProvider options={options}>
      <CartWrapper />
    </CartProvider>
  )
}

export { Cart }
