import React, { useContext, useRef, useEffect, useState } from "react"
import { ProductBuyButtonContext } from "../_state/context"
import { ShopContext } from "../../../../shop/_state/context"
import { Loader } from "../../../../loader"
import { Notice } from "../../../../notice"
import { ItemsContext } from "../../../../items/_state/context"
import { ProductContext } from "../../_state/context"
import { hasHooks } from "../../../../../common/utils"
import { useAnime, pulse } from "../../../../../common/animations"
import { hasCustomCheckoutAttributes } from "../../../../../common/checkout"

import { checkoutRedirect } from "../../../../cart/checkout"

import {
  buildClient,
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
  updateCheckoutAttributes
} from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"
import to from "await-to-js"

function ProductAddButton() {
  const button = useRef()
  const isFirstRender = useRef(false)
  const animePulse = useAnime(pulse)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [hasNotice, setHasNotice] = useState(false)

  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const [buyButtonState, buyButtonDispatch] = useContext(
    ProductBuyButtonContext
  )
  const [shopState, shopDispatch] = useContext(ShopContext)

  const isDirectCheckout =
    itemsState.componentOptions.directCheckout ||
    shopState.settings.checkout.directCheckout

  const buttonStyle = {
    backgroundColor: itemsState.componentOptions.addToCartButtonColor
  }

  function findVariantFromSelections() {
    return findVariantFromSelectedOptions(
      buyButtonState.product,
      buyButtonState.selectedOptions
    )
  }

  function findSingleVariantFromPayload() {
    return buyButtonState.product.variants[0]
  }

  function buildAddToCartParams(lineItems, variants) {
    return {
      checkoutId: shopState.checkoutId,
      lineItems: lineItems,
      variants: variants
    }
  }

  function buildLineItemParams(variant, quantity) {
    return [
      {
        variantId: variant.id,
        quantity: quantity
      }
    ]
  }

  async function handleClick(e) {
    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!buyButtonState.allOptionsSelected && productState.hasManyVariants) {
      buyButtonDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
    } else {
      if (productState.hasManyVariants) {
        var variant = findVariantFromSelections()
      } else {
        var variant = findSingleVariantFromPayload()
      }

      if (!variant) {
        // TODO: Handle this better
        console.error("wpshopify error 💩 variant undefined ", variant)

        buyButtonDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
        buyButtonDispatch({ type: "SET_ALL_SELECTED_OPTIONS", payload: false })
        buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" })
        return
      }

      const lineItems = buildLineItemParams(variant, buyButtonState.quantity)

      if (isDirectCheckout) {
        setIsCheckingOut(true)

        const client = buildClient()
        const [err, checkout] = await to(createUniqueCheckout(client))

        if (err) {
          setIsCheckingOut(false)
          buyButtonDispatch({
            type: "SET_ALL_SELECTED_OPTIONS",
            payload: false
          })
          buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" })

          return setHasNotice({
            message: err,
            type: "error"
          })
        }

        const [error, respNewCheckout] = await to(
          addLineItemsAPI(client, checkout, lineItems)
        )

        if (error) {
          setIsCheckingOut(false)
          buyButtonDispatch({
            type: "SET_ALL_SELECTED_OPTIONS",
            payload: false
          })
          buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" })
          return setHasNotice({
            message: error,
            type: "error"
          })
        }

        checkoutRedirect(respNewCheckout, shopState)
      } else {
        hasHooks() &&
          wp.hooks.doAction(
            "product.addToCart",
            buildAddToCartParams(lineItems, [variant])
          )

        buyButtonDispatch({
          type: "SET_ALL_SELECTED_OPTIONS",
          payload: false
        })
        buyButtonDispatch({ type: "REMOVE_SELECTED_OPTIONS" })
        productDispatch({ type: "SET_ADDED_VARIANT", payload: variant })
        productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })

        hasHooks() &&
          wp.hooks.doAction("on.product.addToCart", lineItems, variant)
      }
    }
  }

  useEffect(() => {
    if (!shopState.isShopReady) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (buyButtonState.allOptionsSelected) {
      animePulse(button.current)
    }
  }, [buyButtonState.allOptionsSelected])

  function getButtonText() {
    if (isDirectCheckout) {
      return "Checkout"
    }

    if (itemsState.componentOptions.addToCartButtonText) {
      return itemsState.componentOptions.addToCartButtonText
    }

    return "Add to cart"
  }

  return (
    <div
      className="wps-component wps-component-products-add-button wps-btn-wrapper"
      data-wps-is-component-wrapper
      data-wps-product-id={buyButtonState.product.id}
      data-wps-post-id=""
    >
      <button
        ref={button}
        type="button"
        itemProp="potentialAction"
        itemScope
        itemType="https://schema.org/BuyAction"
        className="wps-btn wps-btn-secondary wps-add-to-cart"
        title={buyButtonState.product.title}
        data-wps-is-ready={shopState.isShopReady ? "1" : "0"}
        data-wps-is-direct-checkout={isDirectCheckout ? "1" : "0"}
        onClick={handleClick}
        style={buttonStyle}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? (
          <Loader />
        ) : (
          hasHooks() &&
          wp.hooks.applyFilters("product.addToCart.text", getButtonText())
        )}
      </button>

      {hasNotice && (
        <Notice message={hasNotice.message} type={hasNotice.type} />
      )}
    </div>
  )
}

export { ProductAddButton }
