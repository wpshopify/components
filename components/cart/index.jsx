import { CartProvider } from './_state/provider'
import { CartWrapper } from './wrapper'

function Cart({ options }) {
  return (
    wpshopify.settings.general.cartLoaded && (
      <CartProvider options={options}>
        <CartWrapper />
      </CartProvider>
    )
  )
}

export { Cart }
