/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartContext } from '../../_state/context';
import { addDiscountHelper, useAddDiscount, useRemoveDiscountCode } from '../../_common';
import CartFooterDiscount from '../discount';

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ '../../../loader')
);

function CartFooterDiscountWrapper() {
  const { useRef, useContext } = wp.element;
  const [cartState, cartDispatch] = useContext(CartContext);
  const discountInputRef = useRef(false);

  const addDiscountQuery = useAddDiscount(cartState, cartDispatch);

  const footerStyles = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `;

  const discountFormCSS = css`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
  `;

  const discountFormInputCSS = css`
    && {
      appearance: none;
      background: transparent;
      flex: 1;
      font-size: 16px;
      padding: 10px;
      margin-right: 10px;
      border-radius: 5px;
      border: 1px solid #313131;
      outline: none;
      color: #121212;
      box-shadow: none;

      &:disabled {
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  `;

  const discountFormButtonCSS = css`
    width: 100px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #313131;
    appearance: none;
    color: black;
    background: white;
    padding: 0;

    &:hover {
      cursor: ${cartState.isUpdating ? 'not-allowed' : 'pointer'};
      color: rgba(0, 0, 0, 0.5);
      background: white;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      color: #c4c4c4;

      &:hover {
        cursor: not-allowed;
      }
    }

    .ball-pulse > div {
      background: black !important;
      width: 8px !important;
      height: 8px !important;
    }
  `;

  const removeDiscountQuery = useRemoveDiscountCode(cartState, cartDispatch);

  function onAddDiscount(e) {
    addDiscountHelper(cartDispatch, discountInputRef.current.value);
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      addDiscountHelper(cartDispatch, discountInputRef.current.value);
    }
  }

  function onRemoval() {
    cartDispatch({ type: 'SET_IS_REMOVING_DISCOUNT_CODE', payload: true });
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true });
  }

  return (
    <>
      <div css={footerStyles}>
        {!cartState.discountCode || cartState.isAddingDiscountCode ? (
          <div css={discountFormCSS}>
            <input
              type='text'
              placeholder={wp.i18n.__('Discount code', 'wpshopify')}
              ref={discountInputRef}
              css={discountFormInputCSS}
              disabled={cartState.isUpdating || cartState.isCartEmpty}
              onKeyDown={onKeyDown}
            />
            <button
              css={discountFormButtonCSS}
              onClick={onAddDiscount}
              disabled={cartState.isUpdating || cartState.isCartEmpty}>
              {!cartState.isUpdating && <span>{wp.i18n.__('Apply', 'wpshopify')}</span>}
              {cartState.isUpdating && <Loader />}
            </button>
          </div>
        ) : (
          <CartFooterDiscount
            isRemoving={cartState.isRemovingDiscountCode}
            discountCode={cartState.discountCode}
            onRemoval={onRemoval}
          />
        )}
      </div>
    </>
  );
}

export default CartFooterDiscountWrapper;
