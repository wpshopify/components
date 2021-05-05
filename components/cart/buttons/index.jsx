import CartButton from './button';
import { v4 as uuidv4 } from 'uuid';

function CartButtonsWrapper({ buttons }) {
  return (
    buttons && buttons.map((buttonOptions) => <CartButton key={uuidv4()} options={buttonOptions} />)
  );
}
const CartButtons = wp.element.memo(CartButtonsWrapper);

export default CartButtons;
