import find from 'lodash/find';
import { CartContext } from '../../_state/context';
import { calcLineItemTotal } from '../../../../common/products';
import { useAnime, fadeInRightSlow } from '../../../../common/animations';
import { containerFluidCSS, flexRowCSS, mq } from '../../../../common/css';
import CartLineItemQuantityIncIcon from './icon-inc';
import CartLineItemQuantityDecIcon from './icon-dec';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const { useContext } = wp.element;

// 1 is the previous value before decrementing _again_
function isRemovingLineItem(quantity) {
  return Number(quantity) === 0;
}

function getLineItemFromState(lineItem, lineItemsFromState) {
  return find(lineItemsFromState, { variantId: lineItem.id });
}

function CartLineItemQuantity({
  lineItem,
  variantId,
  lineItemQuantity,
  setLineItemQuantity,
  isFirstRender,
  setLineItemTotal,
  lineItemTotalElement,
}) {
  const [cartState, cartDispatch] = useContext(CartContext);
  const animeFadeInRightSlow = useAnime(fadeInRightSlow);

  const maxQuantity = wp.hooks.applyFilters(
    'cart.lineItems.maxQuantity',
    false,
    cartState,
    lineItem
  );
  const minQuantity = wp.hooks.applyFilters(
    'cart.lineItems.minQuantity',
    false,
    cartState,
    lineItem
  );
  const customStep = wp.hooks.applyFilters(
    'cart.lineItems.quantityStep',
    false,
    cartState,
    lineItem
  );

  const inputStyles = css`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  `;

  const lineItemQuantityCSS = css`
    && {
      margin: 0;
      width: 45px;
      border: none;
      text-align: center;
      font-size: 16px;
      margin-right: 0px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      max-height: 35px;
      border-radius: 0;
      appearance: none;
      padding: 0;
      color: #121212;
      background: white;

      ${mq('small')} {
        width: 60px;
        height: 60px;
        max-height: 60px;
        font-size: 24px;
      }
    }
  `;

  function changeQuantity(newQuantity) {
    let lineItemFound = getLineItemFromState(lineItem, cartState.checkoutCache.lineItems);

    if (lineItemFound && isFirstRender.current) {
      variantId.current = lineItemFound.variantId;
    }

    animeFadeInRightSlow(lineItemTotalElement.current);

    setLineItemQuantity(newQuantity);
    setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price));

    if (isRemovingLineItem(newQuantity)) {
      cartDispatch({
        type: 'REMOVE_LINE_ITEM',
        payload: {
          lineItem: variantId.current,
          checkoutId: cartState.checkoutId,
        },
      });
    }

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: newQuantity,
        },
        checkoutId: cartState.checkoutId,
      },
    });
  }

  function handleQuantityChange(e) {
    if (e.target.value || e.target.value === 0) {
      if (maxQuantity && e.target.value >= maxQuantity) {
        setLineItemQuantity(maxQuantity);
      } else if (minQuantity && e.target.value <= minQuantity) {
        setLineItemQuantity(minQuantity);
      } else {
        setLineItemQuantity(e.target.value);
      }
    }
  }

  function handleQuantityBlur(e) {
    if (e.target.value || e.target.value === 0) {
      if (isRemovingLineItem(e.target.value)) {
        cartDispatch({
          type: 'REMOVE_LINE_ITEM',
          payload: {
            lineItem: variantId.current,
            checkoutId: cartState.checkoutId,
          },
        });
      }

      cartDispatch({
        type: 'UPDATE_LINE_ITEM_QUANTITY',
        payload: {
          lineItem: {
            variantId: variantId.current,
            lineItemNewQuantity: Number(e.target.value),
          },
          checkoutId: cartState.checkoutId,
        },
      });
    }
  }

  /*

   Responsible for: decrementing line item quantity

   */
  function handleDecrement() {
    if (minQuantity && lineItemQuantity <= minQuantity) {
      changeQuantity(minQuantity);
    } else {
      if (!customStep) {
        changeQuantity(lineItemQuantity - 1);
      } else {
        changeQuantity(lineItemQuantity - customStep);
      }
    }
  }

  /*

   Responsible for: incrementing line item quantity

   */
  function handleIncrement() {
    if (maxQuantity && lineItemQuantity >= maxQuantity) {
      changeQuantity(maxQuantity);
    } else {
      if (!customStep) {
        changeQuantity(lineItemQuantity + 1);
      } else {
        changeQuantity(lineItemQuantity + customStep);
      }
    }
  }

  const cartLineItemQuantityIncDecCSS = css`
    color: #333;
    display: block;
    margin-top: 0;
    position: relative;
    padding: 0 10px;
    font-size: 17px;
    font-family: monospace;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    text-align: center;
    border: 1px solid #ddd;
    width: 35px;
    height: 35px;
    outline: none;
    outline-offset: 0;

    &:hover {
      background: #f5f5f5;
    }

    &:focus {
      background: transparent;
    }

    ${mq('small')} {
      font-size: 26px;
      width: 60px;
      height: 60px;
    }
  `;

  const cartLineItemQuantityIncCSS = css`
    border-radius: 0 3px 3px 0;
  `;

  const cartLineItemQuantityDecCSS = css`
    border-radius: 3px 0 0 3px;
  `;

  const lineItemQuantityContainer = css`
    width: 115px;

    ${mq('small')} {
      width: 100%;
    }
  `;

  return (
    <div
      className='wps-cart-lineitem-quantity-container'
      css={[containerFluidCSS, lineItemQuantityContainer]}>
      <div css={[flexRowCSS, inputStyles]}>
        <button
          className='wps-quantity-decrement'
          css={[cartLineItemQuantityIncDecCSS, cartLineItemQuantityDecCSS]}
          type='button'
          onClick={handleDecrement}>
          <CartLineItemQuantityDecIcon />
        </button>

        <input
          className='wps-cart-lineitem-quantity'
          type='number'
          min='0'
          onFocus={(e) => e.currentTarget.select()}
          aria-label='Quantity'
          css={lineItemQuantityCSS}
          value={lineItemQuantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
          disabled={customStep}
        />

        <button
          className='wps-quantity-increment'
          css={[cartLineItemQuantityIncDecCSS, cartLineItemQuantityIncCSS]}
          type='button'
          onClick={handleIncrement}>
          <CartLineItemQuantityIncIcon />
        </button>
      </div>
    </div>
  );
}

export { CartLineItemQuantity };
