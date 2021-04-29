/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartContext } from '../_state/context';
import { buttonCSS, mq } from '../../../common/css';
import { Loader } from '../../loader';

function CartCheckoutButton({ onCheckout }) {
  const { useContext } = wp.element;
  const [cartState, cartDispatch] = useContext(CartContext);

  const checkoutButtonCSS = css`
    font-size: 22px;
    margin-top: 0.5em;
    margin-bottom: 0;
    background-color: ${cartState.isCheckingOut || !cartState.termsAccepted || cartState.isCartEmpty
      ? '#cfcfcf'
      : wpshopify.settings.general.checkoutColor};
    padding: 16px 0 20px 0;
    transition: none;

    &:hover {
      background-color: ${cartState.isCheckingOut ||
      !cartState.termsAccepted ||
      cartState.isCartEmpty
        ? '#cfcfcf'
        : wpshopify.settings.general.checkoutColor};
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
        color: #fff;
        background-color: #cfcfcf;
      }
    }

    ${mq('small')} {
      font-size: 22px;
    }
  `;

  function onCheckout() {
    cartDispatch({ type: 'UPDATE_NOTICES', payload: [] });
    cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: true });

    wp.hooks.doAction('on.checkout', cartState);
  }

  return (
    <button
      className='wps-btn-checkout'
      onClick={onCheckout}
      disabled={cartState.isCheckingOut || !cartState.termsAccepted || cartState.isCartEmpty}
      css={[buttonCSS, checkoutButtonCSS]}>
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        cartState.checkoutText
      )}
    </button>
  );
}

export default CartCheckoutButton;
