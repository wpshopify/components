/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ProductContext } from '../../../_state/context';

function ProductQuantityInput({ minQuantity, maxQuantity, addedToCart }) {
  const { useEffect, useContext, useState } = wp.element;
  const [, productDispatch] = useContext(ProductContext);
  const [quantityValue, setQuantityValue] = useState(() => minQuantity);
  const customStep = wp.hooks.applyFilters('buyButton.quantityStep', false);

  const inputStyles = css`
    && {
      margin: 0 0 25px 7px;
      text-align: center;
      max-width: 60px;
      font-size: 1em;
      border: 1px solid #313131;
      border-radius: 5px;
      padding: 7px;
      color: #121212;
    }
  `;

  useEffect(() => {
    if (addedToCart) {
      handleQuantityChange();
    }
  }, [addedToCart]);

  function handleQuantityChange(event = false) {
    if (!event) {
      let quantityAmount = Number(minQuantity);
      productDispatch({ type: 'UPDATE_QUANTITY', payload: quantityAmount });
      setQuantityValue(quantityAmount);
    } else {
      let quantityAmount = Number(event.target.value);

      if (customStep) {
        if (quantityValue === 1 && customStep !== 1) {
          quantityAmount = customStep;
        } else {
          if (quantityAmount > quantityValue) {
            quantityAmount = quantityValue + customStep;
          } else {
            quantityAmount = quantityValue - customStep;
          }
        }
      }

      if (quantityAmount === 0) {
        quantityAmount = 1;
      }

      productDispatch({ type: 'UPDATE_QUANTITY', payload: quantityAmount });
      setQuantityValue(quantityAmount);
    }
  }

  const quantityInputWrapperCSS = css`
    display: inline-block;
    margin: 0;
  `;

  return (
    <div className='wps-quantity-input wps-quantity-input-wrapper' css={quantityInputWrapperCSS}>
      <input
        css={inputStyles}
        type='number'
        name='wps-product-quantity'
        className='wps-product-quantity wps-form-input'
        value={quantityValue}
        onChange={handleQuantityChange}
        onFocus={(e) => e.currentTarget.select()}
        min={minQuantity ? minQuantity : undefined}
        max={maxQuantity ? maxQuantity : undefined}
      />
    </div>
  );
}

export { ProductQuantityInput };
