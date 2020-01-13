import React, { useContext } from "react"
import { CartContext } from "../../_state/context"
import { ShopContext } from "../../../shop/_state/context"

import find from "lodash/find"
import { calcLineItemTotal } from "../../../../common/products"
import { useAnime, pulse } from "../../../../common/animations"
import { containerFluidCSS } from "../../../../common/css"
import { hasHooks } from "../../../../common/utils"

/** @jsx jsx */
import { jsx, css } from "@emotion/core"

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
  isReady,
  isFirstRender,
  setLineItemTotal,
  lineItemTotalElement
}) {
  const [shopState] = useContext(ShopContext)
  const [cartState, cartDispatch] = useContext(CartContext)
  const animePulse = useAnime(pulse)

  const maxQuantity = hasHooks()
    ? wp.hooks.applyFilters("cart.maxQuantity", false)
    : false

  function changeQuantity(newQuantity) {
    let lineItemFound = getLineItemFromState(
      lineItem,
      cartState.checkoutCache.lineItems
    )

    if (lineItemFound && isFirstRender.current) {
      variantId.current = lineItemFound.variantId
    }

    animePulse(lineItemTotalElement.current)

    setLineItemQuantity(newQuantity)
    setLineItemTotal(calcLineItemTotal(newQuantity, lineItem.price))

    if (isRemovingLineItem(newQuantity)) {
      cartDispatch({
        type: "REMOVE_LINE_ITEM",
        payload: {
          lineItem: variantId.current,
          checkoutId: shopState.checkoutId
        }
      })
    }

    cartDispatch({
      type: "UPDATE_LINE_ITEM_QUANTITY",
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: newQuantity
        },
        checkoutId: shopState.checkoutId
      }
    })
  }

  function handleQuantityChange(e) {
    if (maxQuantity && e.target.value >= maxQuantity) {
      setLineItemQuantity(maxQuantity)
    } else {
      setLineItemQuantity(e.target.value)
    }
  }

  function handleQuantityBlur(e) {
    if (isRemovingLineItem(e.target.value)) {
      cartDispatch({
        type: "REMOVE_LINE_ITEM",
        payload: {
          lineItem: variantId.current,
          checkoutId: shopState.checkoutId
        }
      })
    }

    cartDispatch({
      type: "UPDATE_LINE_ITEM_QUANTITY",
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: Number(e.target.value)
        },
        checkoutId: shopState.checkoutId
      }
    })
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
    <div
      className="wps-cart-lineitem-quantity-container"
      data-wps-is-ready={isReady}
      css={containerFluidCSS}
    >
      <div className="row">
        <button
          className="wps-quantity-decrement"
          type="button"
          onClick={handleDecrement}
        >
          <span className="wps-quantity-icon wps-quantity-decrement-icon" />
        </button>

        <input
          className="wps-cart-lineitem-quantity"
          type="number"
          min="0"
          max="8"
          aria-label="Quantity"
          value={lineItemQuantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
        />

        <button
          className="wps-quantity-increment"
          type="button"
          onClick={handleIncrement}
        >
          <span className="wps-quantity-icon wps-quantity-increment-icon" />
        </button>
      </div>
    </div>
  )
}

export { CartLineItemQuantity }
