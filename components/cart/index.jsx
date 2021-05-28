import { CartProvider } from './_state/provider';
import { CartWrapper } from './wrapper';

function Cart({ options }) {
  console.log('options', options);

  return (
    <CartProvider cartOptions={options[0]} productOptions={options[1]}>
      <CartWrapper />
    </CartProvider>
  );
}

export default Cart;
