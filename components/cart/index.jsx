import { CartProvider } from './_state/provider'
import { CartWrapper } from './wrapper'

function Cart({ options }) {
  return (
    <CartProvider options={options}>
      <CartWrapper />
    </CartProvider>
  )
}

export { Cart }
