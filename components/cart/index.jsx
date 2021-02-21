import { CartProvider } from './_state/provider';
import { CartWrapper } from './wrapper';

function Cart({ options }) {
  return (
    <CartProvider cartOptions={options[0]} productOptions={options[1]}>
      <CartWrapper />
    </CartProvider>
  );
}

export { Cart };
