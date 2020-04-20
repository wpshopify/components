import { ProductContext } from '../../../_state/context'
import { ProductBuyButtonContext } from '../../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useEffect, useContext, useRef, useState } = wp.element

function ProductQuantityInput({ minQuantity, maxQuantity, isShopReady }) {
  const [productState] = useContext(ProductContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const element = useRef()
  const [quantityValue, setQuantityValue] = useState(() => minQuantity)

  const inputWrapperStyles = css``

  const inputStyles = css`
    margin: 15px 0 15px 7px;
    text-align: center;
    max-width: 60px;
    font-size: 1em;
    border: 1px solid #313131;
    border-radius: 5px;
    padding: 7px;
  `

  useEffect(
    function () {
      handleQuantityChange()
    },
    [productState.addedToCart]
  )

  function handleQuantityChange(event = false) {
    if (!event) {
      buyButtonDispatch({ type: 'UPDATE_QUANTITY', payload: Number(minQuantity) })
      setQuantityValue(minQuantity)
    } else {
      buyButtonDispatch({ type: 'UPDATE_QUANTITY', payload: Number(event.target.value) })
      setQuantityValue(event.target.value)
    }
  }

  return (
    <div
      className='wps-quantity-input wps-quantity-input-wrapper'
      data-wps-is-ready={isShopReady ? '1' : '0'}
      css={inputWrapperStyles}>
      <input
        ref={element}
        css={inputStyles}
        type='number'
        name='wps-product-quantity'
        className='wps-product-quantity wps-form-input'
        value={quantityValue}
        onChange={handleQuantityChange}
        min={minQuantity}
        max={maxQuantity ? maxQuantity : undefined}
      />
    </div>
  )
}

export { ProductQuantityInput }
