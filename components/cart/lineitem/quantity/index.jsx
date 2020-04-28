import find from 'lodash/find'
import { CartContext } from '../../_state/context'
import { calcLineItemTotal } from '../../../../common/products'
import { useAnime, pulse } from '../../../../common/animations'
import { containerFluidCSS, flexRowCSS } from '../../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

// 1 is the previous value before decrementing _again_
function isRemovingLineItem(quantity) {
  return Number(quantity) === 0
}

function getLineItemFromState(lineItem, lineItemsFromState) {
  return find(lineItemsFromState, { variantId: lineItem.id })
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
  const [cartState, cartDispatch] = useContext(CartContext)
  const animePulse = useAnime(pulse)

  const maxQuantity = wp.hooks.applyFilters('cart.maxQuantity', false)

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
  `

  function changeQuantity(newQuantity) {
    let lineItemFound = getLineItemFromState(lineItem, cartState.checkoutCache.lineItems)

    if (lineItemFound && isFirstRender.current) {
      variantId.current = lineItemFound.variantId
    }

    animePulse(lineItemTotalElement.current)

    setLineItemQuantity(newQuantity)
    setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price))

    if (isRemovingLineItem(newQuantity)) {
      cartDispatch({
        type: 'REMOVE_LINE_ITEM',
        payload: {
          lineItem: variantId.current,
          checkoutId: cartState.checkoutId,
        },
      })
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
    })
  }

  function handleQuantityChange(e) {
    if (e.target.value || e.target.value === 0) {
      if (maxQuantity && e.target.value >= maxQuantity) {
        setLineItemQuantity(maxQuantity)
      } else {
        setLineItemQuantity(e.target.value)
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
        })
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
      })
    }
  }

  /*

   Responsible for: decrementing line item quantity

   */
  function handleDecrement() {
    changeQuantity(lineItemQuantity - 1)
  }

  /*

   Responsible for: incrementing line item quantity

   */
  function handleIncrement() {
    if (maxQuantity && lineItemQuantity >= maxQuantity) {
      changeQuantity(maxQuantity)
    } else {
      changeQuantity(lineItemQuantity + 1)
    }
  }

  return (
    <div className='col-8'>
      <div className='wps-cart-lineitem-quantity-container' css={containerFluidCSS}>
        <div css={[flexRowCSS, inputStyles]}>
          <button className='wps-quantity-decrement' type='button' onClick={handleDecrement}>
            <span className='wps-quantity-icon wps-quantity-decrement-icon' />
          </button>

          <input
            className='wps-cart-lineitem-quantity'
            type='number'
            min='0'
            max='8'
            aria-label='Quantity'
            value={lineItemQuantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
          />

          <button className='wps-quantity-increment' type='button' onClick={handleIncrement}>
            <span className='wps-quantity-icon wps-quantity-increment-icon' />
          </button>
        </div>
      </div>
    </div>
  )
}

export { CartLineItemQuantity }
