import CartButton from './button';

function CartButtonsWrapper({ buttons }) {
  return (
    buttons && buttons.map((button) => <CartButton key={button.componentId} options={button} />)
  );
}

const CartButtons = wp.element.memo(CartButtonsWrapper);

export default CartButtons;
