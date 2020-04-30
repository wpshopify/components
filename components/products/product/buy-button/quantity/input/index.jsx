import { ProductBuyButtonContext } from '../../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useEffect, useContext, useState } = wp.element

function ProductQuantityInput({ minQuantity, maxQuantity, addedToCart }) {
  console.log('<ProductQuantityInput> :: Render Start')
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [quantityValue, setQuantityValue] = useState(() => minQuantity)

  const inputStyles = css`
    margin: 15px 0 15px 7px;
    text-align: center;
    max-width: 60px;
    font-size: 1em;
    border: 1px solid #313131;
    border-radius: 5px;
    padding: 7px;
  `

  useEffect(() => {
    if (addedToCart) {
      handleQuantityChange()
    }
  }, [addedToCart])

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
    <div className='wps-quantity-input wps-quantity-input-wrapper'>
      <input
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
