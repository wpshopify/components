import React, { useContext, useRef } from "react"
import { ShopContext } from "../../shop/_state/context"
import { CartContext } from "../_state/context"
import { Loader } from "../../loader"
import { hasHooks, FilterHook } from "../../../common/utils"
import { hasCustomCheckoutAttributes } from "../../../common/checkout"

import {
  replaceLineItems,
  updateCheckoutAttributes
} from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"
import isEmpty from "lodash/isEmpty"
import to from "await-to-js"

function checkoutRedirect(checkout, shopState) {
  var target = checkoutWindowTarget(shopState)

  if (
    !shopState.settings.enableCustomCheckoutDomain ||
    !hasManagedDomain(checkout.webUrl)
  ) {
    return managedDomainRedirect(checkout, target)
  }

  customDomainRedirect(checkout, shopState, target)
}

function hasManagedDomain(url) {
  return url.includes("myshopify.com")
}

function managedDomainRedirect(checkout, target) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(checkout.webUrl)
  } else {
    var checkoutUrl = checkout.webUrl
  }

  redirect(checkoutUrl, target)
}

function hasGaLoaded() {
  return window.ga !== undefined
}

function decorateCheckoutUrl(link) {
  var tracker = ga.getAll()[0]
  var linker = new window.gaplugins.Linker(tracker)

  return linker.decorate(link)
}

function redirect(checkoutUrl, target) {
  window.open(checkoutUrl, target)
}

function customDomainRedirect(checkout, shopState, target) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(
      checkoutUrlWithCustomDomain(shopState, checkout.webUrl)
    )
  } else {
    var checkoutUrl = checkoutUrlWithCustomDomain(shopState, checkout.webUrl)
  }

  redirect(checkoutUrl, target)
}

function checkoutUrlWithCustomDomain(shopState, webUrl) {
  return shopState.info.primaryDomain.url + extractCheckoutURL(webUrl)
}

function checkoutWindowTarget(shopState) {
  if (shopState.isMobile) {
    // cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
    return "_self"
  }

  //   if (shopState.settings.checkoutButtonTarget === "_blank") {
  //     // cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
  //   }

  return shopState.settings.checkoutButtonTarget
}

function extractCheckoutURL(webUrl) {
  return webUrl.split("myshopify.com")[1]
}

function CartCheckout() {
  const [shopState] = useContext(ShopContext)
  const [cartState, cartDispatch] = useContext(CartContext)
  const checkoutButton = useRef()

  async function onCheckout() {
    cartDispatch({ type: "UPDATE_NOTICES", payload: [] })
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: true })

    hasHooks() && wp.hooks.doAction("on.checkout", cartState.checkoutCache)

    const [checkoutWithLineitemsError, checkoutWithLineitems] = await to(
      replaceLineItems(cartState.checkoutCache.lineItems)
    )

    if (checkoutWithLineitemsError) {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
      return cartDispatch({
        type: "UPDATE_NOTICES",
        payload: { type: "error", message: checkoutWithLineitemsError }
      })
    }

    if (isEmpty(checkoutWithLineitems.lineItems)) {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
      return cartDispatch({
        type: "UPDATE_NOTICES",
        payload: { type: "error", message: "No line items exist " }
      })
    }

    if (hasCustomCheckoutAttributes(cartState)) {
      const [checkoutWithAttrsError, checkoutWithAttrs] = await to(
        updateCheckoutAttributes({
          customAttributes: cartState.customAttributes,
          note: cartState.note
        })
      )

      if (checkoutWithAttrsError) {
        cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
        return cartDispatch({
          type: "UPDATE_NOTICES",
          payload: { type: "error", message: checkoutWithAttrsError }
        })
      }

      return checkoutRedirect(checkoutWithAttrs, shopState)
    }

    checkoutRedirect(checkoutWithLineitems, shopState)
  }

  function buttonStyle() {
    return {
      backgroundColor: shopState.settings.cart.checkoutButtonColor
    }
  }

  return (
    <>
      <FilterHook name="cart.checkout.before" args={[cartState]} />

      <CartCheckoutButton
        cartState={cartState}
        onCheckout={onCheckout}
        buttonStyle={buttonStyle}
        shopState={shopState}
        buttonRef={checkoutButton}
      />

      <FilterHook name="cart.checkout.after" args={[cartState]} />
    </>
  )
}

function CartCheckoutButton({
  cartState,
  buttonStyle,
  onCheckout,
  shopState,
  buttonRef
}) {
  return (
    <button
      ref={buttonRef}
      className="wps-btn wps-btn-checkout"
      onClick={onCheckout}
      data-wps-is-ready={shopState.isCartReady ? "1" : "0"}
      disabled={
        cartState.isCheckingOut ||
        !cartState.termsAccepted ||
        cartState.isCartEmpty
      }
      style={buttonStyle()}
    >
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        cartState.checkoutText
      )}
    </button>
  )
}

export { CartCheckout, checkoutRedirect }
