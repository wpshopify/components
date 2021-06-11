import { CartProvider } from './_state/provider';
import { CartWrapper } from './wrapper';

function Cart({ options }) {
  return (
    <CartProvider
      cartOptions={options[0]}
      productOptions={options[1]}
      storefrontOptions={options[2]}
      searchOptions={options[3]}>
      <CartWrapper />
    </CartProvider>
  );
}

export default Cart;
