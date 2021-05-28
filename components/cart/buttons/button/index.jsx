import { CartContext } from '../../_state/context';
import { CartCounter } from '../counter';
import { CartIcon } from '../icon';
import { CartButtonProvider } from './_state/provider';
import { useAnime, slideInRight } from '../../../../common/animations';
import { usePortal } from '../../../../common/hooks';
import { isCartEmpty } from '../../../../common/cart';

/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';

const { useContext, useRef, useEffect } = wp.element;

function CartButton({ options }) {
  const [cartState, cartDispatch] = useContext(CartContext);
  const counterElement = useRef();
  const animeSlideInRight = useAnime(slideInRight);

  useEffect(() => {
    if (options.payloadSettings.type === 'fixed' && wpshopify.settings.general.showFixedCartTab) {
      animeSlideInRight(counterElement.current);
    }
  }, []);

  function onClick(e) {
    cartDispatch({ type: 'CART_LOADED', payload: true }); // for mobile
    cartDispatch({ type: 'TOGGLE_CART', payload: true });
  }

  function onMouseOver() {
    cartDispatch({ type: 'CART_LOADED', payload: true });
  }

  function shouldShowCartButton() {
    if (options.payloadSettings.type !== 'fixed') {
      return true;
    }

    if (!wpshopify.settings.general.showFixedCartTab) {
      return false;
    }

    if (!wpshopify.misc.isPro) {
      return true;
    }

    if (wpshopify.settings.general.cartConditionalFixedTabLoading === 'all') {
      return true;
    } else if (wpshopify.settings.general.cartConditionalFixedTabLoading === 'withProducts') {
      if (cartState.productsVisible) {
        return true;
      }

      return false;
    } else if (wpshopify.settings.general.cartConditionalFixedTabLoading === 'manual') {
      if (
        wpshopify.settings.general.cartConditionalManuallySelectedPages.includes(
          wpshopify.misc.postID.toString()
        )
      ) {
        return true;
      }
      return false;
    }
  }

  const cartIconCSS = css`
    background-color: ${options.payloadSettings.type === 'fixed'
      ? wpshopify.settings.general.cartFixedBackgroundColor
      : 'transparent'};
    cursor: pointer;
    pointer-events: auto;

    &:hover,
    &:focus {
      border: none;
      outline: none;
      background-color: ${options.payloadSettings.type === 'fixed'
        ? wpshopify.settings.general.cartFixedBackgroundColor
        : 'transparent'};
    }
  `;

  const slideInFromRight = keyframes`
      0% {
         transform: translateX(100%);
      }
      100% {
         transform: translateX(calc(100% - 70px));
      }
   `;

  const cartIconFixedCSS =
    options.payloadSettings.type === 'fixed'
      ? css`
          position: fixed;
          top: calc(50% - 80px);
          right: 0;
          z-index: 99999;
          border-radius: 6px 0 0 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 0 17px 0;
          justify-content: center;
          animation: 0.25s ease-out 0s 1 ${slideInFromRight};
          width: 70px;
          border: none;
          outline: none;
          overflow-y: visible;

          &:focus,
          &:active {
            position: fixed;
            top: calc(50% - 80px);
          }

          &:hover {
            cursor: pointer;
            position: fixed;
            top: calc(50% - 80px);

            span,
            svg {
              opacity: 0.8;
            }
          }
        `
      : css`
          border: none;
          outline: none;
          position: relative;
          top: -5px;
          right: 0px;

          &:hover {
            cursor: pointer;
          }

          .ball-pulse > div {
            width: 9px;
            height: 9px;
          }

          .wps-loader {
            position: relative;
            top: 2px;
            left: 0.01em;
          }
        `;

  return shouldShowCartButton()
    ? usePortal(
        <CartButtonProvider options={options}>
          <button
            data-is-cart-ready={cartState.isCartReady ? '1' : '0'}
            role='button'
            ref={counterElement}
            className={`wps-btn-cart wps-cart-icon-${options.payloadSettings.type} ${
              isCartEmpty(cartState.checkoutCache.lineItems) ? 'wps-cart-is-empty' : ''
            }`}
            onClick={onClick}
            onMouseOver={onMouseOver}
            css={[cartIconCSS, cartIconFixedCSS]}>
            {options.payloadSettings.showCounter && <CartCounter />}

            <CartIcon />
          </button>
        </CartButtonProvider>,
        options.componentElement
      )
    : '';
}

export default CartButton;
