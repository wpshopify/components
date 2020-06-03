import { CartProvider } from './_state/provider'
import { CartWrapper } from './wrapper'

function Cart({ options }) {
  return (
    wpshopify.settings.general.cartLoaded && (
      <CartProvider cartOptions={options[0]} productOptions={options[1]}>
        <CartWrapper />
      </CartProvider>
    )
  )
}

export { Cart }
