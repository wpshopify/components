import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'
import { Loader } from '../../loader'
import { FilterHook } from '../../../common/utils'
import { hasCustomCheckoutAttributes } from '../../../common/checkout'

import {
  replaceLineItems,
  updateCheckoutAttributes,
  addDiscount,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import isEmpty from 'lodash/isEmpty'
import to from 'await-to-js'

const { __ } = wp.i18n
const { useContext, useRef } = wp.element

function hasCustomDomain(shopState, checkout) {
  if (!shopState.settings.general.enableCustomCheckoutDomain) {
    return false
  }

  // If URL contains myshopify.com
  if (hasManagedDomain(checkout.webUrl)) {
    return false
  }

  return true
}

function checkoutRedirectOnly(checkout, shopState) {
  var target = checkoutWindowTarget(shopState)

  if (hasCustomDomain(shopState, checkout)) {
    customDomainRedirect(checkout, shopState, target)
  }

  return managedDomainRedirect(checkout, target)
}

function hasDiscount(checkout, shopState) {
  /* @if NODE_ENV='pro' */
  var hasCustomDiscount = wp.hooks.applyFilters('set.checkout.discount', false, checkout)

  if (hasCustomDiscount) {
    return hasCustomDiscount
  }
  /* @endif */

  return shopState.discountCode
}

async function checkoutRedirect(checkout, shopState, componentDispatch) {
  const discountCode = hasDiscount(checkout, shopState)

  wp.hooks.doAction('before.checkout.redirect', checkout, shopState)

  if (discountCode) {
    const [err, resp] = await to(addDiscount(discountCode, checkout))

    if (err) {
      console.error('WP Shopify error ', err)
      componentDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __(err, wpshopify.misc.textdomain),
        },
      })

      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      return
    }

    checkoutRedirectOnly(resp, shopState)

    return
  }

  checkoutRedirectOnly(checkout, shopState)
}

function hasManagedDomain(url) {
  return url.includes('myshopify.com')
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
  if (!window.gaplugins || !window.gaplugins.Linker) {
    return link
  }

  var tracker = ga.getAll()[0]
  var linker = new window.gaplugins.Linker(tracker)

  return linker.decorate(link)
}

function redirect(checkoutUrl, target) {
  // window.location.href = url; (open in same window)
  window.open(checkoutUrl, target)
}

function customDomainRedirect(checkout, shopState, target) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(checkoutUrlWithCustomDomain(shopState, checkout.webUrl))
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
    return '_self'
  }

  return shopState.settings.general.checkoutButtonTarget
}

function extractCheckoutURL(webUrl) {
  return webUrl.split('myshopify.com')[1]
}

function CartCheckout() {
  const [shopState] = useContext(ShopContext)
  const [cartState, cartDispatch] = useContext(CartContext)
  const checkoutButton = useRef()

  async function onCheckout() {
    cartDispatch({ type: 'UPDATE_NOTICES', payload: [] })
    cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: true })

    wp.hooks.doAction('on.checkout', cartState.checkoutCache)

    var lineItems = wp.hooks.applyFilters(
      'before.checkout.lineItems',
      cartState.checkoutCache.lineItems,
      cartState
    )

    const [checkoutWithLineitemsError, checkoutWithLineitems] = await to(
      replaceLineItems(lineItems)
    )

    if (checkoutWithLineitemsError) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __(checkoutWithLineitemsError, wpshopify.misc.textdomain),
        },
      })
    }

    if (isEmpty(checkoutWithLineitems.lineItems)) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: { type: 'error', message: __('No line items exist ', wpshopify.misc.textdomain) },
      })
    }

    if (hasCustomCheckoutAttributes(shopState)) {
      const [checkoutWithAttrsError, checkoutWithAttrs] = await to(
        updateCheckoutAttributes({
          customAttributes: shopState.customAttributes,
          note: shopState.note,
        })
      )

      if (checkoutWithAttrsError) {
        cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
        return cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: __(checkoutWithAttrsError, wpshopify.misc.textdomain),
          },
        })
      }

      return checkoutRedirect(checkoutWithAttrs, shopState, cartDispatch)
    }

    checkoutRedirect(checkoutWithLineitems, shopState, cartDispatch)
  }

  function buttonStyle() {
    return {
      backgroundColor: shopState.settings.general.checkoutColor,
    }
  }

  return (
    <>
      <FilterHook name='before.cart.checkout.button' args={[cartState]} />

      <CartCheckoutButton
        onCheckout={onCheckout}
        buttonStyle={buttonStyle}
        shopState={shopState}
        buttonRef={checkoutButton}
      />

      <FilterHook name='after.cart.checkout.button' args={[cartState]} />
    </>
  )
}

function CartCheckoutButton({ buttonStyle, onCheckout, shopState, buttonRef }) {
  const [cartState] = useContext(CartContext)

  return (
    <button
      ref={buttonRef}
      className='wps-btn wps-btn-checkout'
      onClick={onCheckout}
      data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
      disabled={cartState.isCheckingOut || !cartState.termsAccepted || cartState.isCartEmpty}
      style={buttonStyle()}>
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        <FilterHook name='cart.checkout.text'>
          {__(cartState.checkoutText, wpshopify.misc.textdomain)}
        </FilterHook>
      )}
    </button>
  )
}

export { CartCheckout, checkoutRedirect }
