import { ErrorBoundary } from 'react-error-boundary'
import { CartContext } from '../_state/context'
import { Loader } from '../../loader'
import ErrorFallback from '../../error-fallback'
import { FilterHook } from '../../../common/utils'
import { hasCustomCheckoutAttributes } from '../../../common/checkout'

import { buttonCSS, mq } from '../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import {
  replaceLineItems,
  updateCheckoutAttributes,
  maybeFetchShop,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

import isEmpty from 'lodash/isEmpty'
import to from 'await-to-js'

const { useContext, useRef } = wp.element

function checkoutRedirectOnly(checkout, primaryDomain) {
  var target = checkoutWindowTarget()

  if (wpshopify.settings.general.enableCustomCheckoutDomain) {
    return customDomainRedirect(checkout, primaryDomain, target)
  }

  return managedDomainRedirect(checkout, target)
}

async function checkoutRedirect(checkout, primaryDomain) {
  wp.hooks.doAction('before.checkout.redirect', checkout)

  checkoutRedirectOnly(checkout, primaryDomain)
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
  if (!window.gaplugins || !window.gaplugins.Linker || !window.ga.getAll) {
    return link
  }

  var tracker = ga.getAll()[0]
  var linker = new window.gaplugins.Linker(tracker)

  return linker.decorate(link)
}

function redirect(checkoutUrl, target) {
  window.open(encodeURI(checkoutUrl), target)
}

function customDomainRedirect(checkout, primaryDomain, target) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(
      checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl)
    )
  } else {
    var checkoutUrl = checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl)
  }

  redirect(checkoutUrl, target)
}

function checkoutUrlWithCustomDomain(primaryDomain, webUrl) {
  return primaryDomain.url + extractCheckoutURL(webUrl)
}

function checkoutWindowTarget() {
  if (wpshopify.misc.isMobile) {
    return '_self'
  }

  return wpshopify.settings.general.checkoutButtonTarget
}

function extractCheckoutURL(webUrl) {
  return webUrl.split('myshopify.com')[1]
}

function CartCheckout() {
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

    const [shopInfoErrors, shopInfo] = await to(maybeFetchShop())

    if (shopInfoErrors) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: shopInfoErrors,
        },
      })
    }

    const [checkoutWithLineitemsError, checkoutWithLineitems] = await to(
      replaceLineItems(lineItems)
    )

    if (checkoutWithLineitemsError) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: checkoutWithLineitemsError,
        },
      })
    }

    if (isEmpty(checkoutWithLineitems.lineItems)) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: wp.i18n.__('No line items exist', 'wpshopify'),
        },
      })
    }

    if (hasCustomCheckoutAttributes(cartState)) {
      const [checkoutWithAttrsError, checkoutWithAttrs] = await to(
        updateCheckoutAttributes({
          customAttributes: cartState.customAttributes,
          note: cartState.note,
        })
      )

      if (checkoutWithAttrsError) {
        cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
        return cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: checkoutWithAttrsError,
          },
        })
      }

      return checkoutRedirect(checkoutWithAttrs, shopInfo.primaryDomain)
    }

    checkoutRedirect(checkoutWithLineitems, shopInfo.primaryDomain)
  }

  return (
    <>
      <FilterHook name='before.cart.checkout.button' args={[cartState]} />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CartCheckoutButton onCheckout={onCheckout} buttonRef={checkoutButton} />
      </ErrorBoundary>

      <FilterHook name='after.cart.checkout.button' args={[cartState]} />
    </>
  )
}

function CartCheckoutButton({ onCheckout, buttonRef }) {
  const [cartState] = useContext(CartContext)

  const checkoutButtonCSS = css`
    font-size: 22px;
    margin-top: 0.5em;
    margin-bottom: 0;
    background-color: ${cartState.isCheckingOut || !cartState.termsAccepted || cartState.isCartEmpty
      ? '#cfcfcf'
      : wpshopify.settings.general.checkoutColor};
    padding: 16px 0 20px 0;
    transition: none;

    &:disabled {
      &:hover {
        cursor: not-allowed;
        color: #fff;
      }
    }

    ${mq('small')} {
      font-size: 22px;
    }
  `

  return (
    <button
      ref={buttonRef}
      className='wps-btn-checkout'
      onClick={onCheckout}
      disabled={cartState.isCheckingOut || !cartState.termsAccepted || cartState.isCartEmpty}
      css={[buttonCSS, checkoutButtonCSS]}>
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        <FilterHook name='cart.checkout.text'>{cartState.checkoutText}</FilterHook>
      )}
    </button>
  )
}

export { CartCheckout, checkoutRedirect }
