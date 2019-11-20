import React, { useContext, useRef } from "react"
import { ShopContext } from "../../shop/_state/context"
import { CartContext } from "../_state/context"
import { Loader } from "../../loader"
import { hasHooks, FilterHook } from "../../../common/utils"
import {
  replaceLineItems,
  updateCheckoutAttributes
} from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"
import isEmpty from "lodash/isEmpty"
import to from "await-to-js"

function CartCheckout() {
  const [shopState] = useContext(ShopContext)
  const [cartState, cartDispatch] = useContext(CartContext)
  const checkoutButton = useRef()

  function hasGaLoaded() {
    return window.ga !== undefined
  }

  function decorateCheckoutUrl(link) {
    var tracker = ga.getAll()[0]
    var linker = new window.gaplugins.Linker(tracker)

    return linker.decorate(link)
  }

  function hasManagedDomain(url) {
    return url.includes("myshopify.com")
  }

  function extractCheckoutURL(webUrl) {
    return webUrl.split("myshopify.com")[1]
  }

  function checkoutUrlWithCustomDomain(webUrl) {
    return shopState.info.primaryDomain.url + extractCheckoutURL(webUrl)
  }

  function checkoutWindowTarget() {
    if (shopState.isMobile) {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
      return "_self"
    }

    if (shopState.settings.checkoutButtonTarget === "_blank") {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
    }

    return shopState.settings.checkoutButtonTarget
  }

  function managedDomainRedirect(checkout) {
    if (hasGaLoaded()) {
      var checkoutUrl = decorateCheckoutUrl(checkout.webUrl)
    } else {
      var checkoutUrl = checkout.webUrl
    }

    redirect(checkoutUrl)
  }

  function customDomainRedirect(checkout) {
    if (hasGaLoaded()) {
      var checkoutUrl = decorateCheckoutUrl(
        checkoutUrlWithCustomDomain(checkout.webUrl)
      )
    } else {
      var checkoutUrl = checkoutUrlWithCustomDomain(checkout.webUrl)
    }

    redirect(checkoutUrl)
  }

  function redirect(checkoutUrl) {
    window.open(checkoutUrl, checkoutWindowTarget())
  }

  function checkoutRedirect(checkout) {
    if (
      !shopState.settings.enableCustomCheckoutDomain ||
      !hasManagedDomain(checkout.webUrl)
    ) {
      return managedDomainRedirect(checkout)
    }

    customDomainRedirect(checkout)
  }

  async function onCheckout() {
    cartDispatch({ type: "UPDATE_NOTICES", payload: [] })
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: true })

    hasHooks() && wp.hooks.doAction("on.checkout", cartState.checkoutCache)

    const [err, success] = await to(
      replaceLineItems(cartState.checkoutCache.lineItems)
    )

    if (err) {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
      return cartDispatch({
        type: "UPDATE_NOTICES",
        payload: { type: "error", message: err }
      })
    }

    if (isEmpty(success.lineItems)) {
      cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
      return cartDispatch({
        type: "UPDATE_NOTICES",
        payload: { type: "error", message: "No line items exist " }
      })
    }

    if (
      (WP_Shopify.misc.isPro && !isEmpty(cartState.customAttributes)) ||
      !isEmpty(cartState.note)
    ) {
      const [errAttr, resp] = await to(
        updateCheckoutAttributes({
          customAttributes: cartState.customAttributes,
          note: cartState.note
        })
      )

      if (errAttr) {
        cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
        return cartDispatch({
          type: "UPDATE_NOTICES",
          payload: { type: "error", message: errAttr }
        })
      }

      return checkoutRedirect(resp)
    }

    checkoutRedirect(success)
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

export { CartCheckout }
