import { CartContext } from '../_state/context'
import { Loader } from '../../loader'
import { FilterHook } from '../../../common/utils'
import { hasCustomCheckoutAttributes } from '../../../common/checkout'
import { __t } from '../../../common/utils'
import { buttonCSS } from '../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import {
  replaceLineItems,
  updateCheckoutAttributes,
  addDiscount,
  maybeFetchShop,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import isEmpty from 'lodash/isEmpty'
import to from 'await-to-js'

const { useContext, useRef } = wp.element

function hasCustomDomain(checkout) {
  if (!wpshopify.settings.general.enableCustomCheckoutDomain) {
    return false
  }

  // If URL contains myshopify.com
  if (hasManagedDomain(checkout.webUrl)) {
    return false
  }

  return true
}

function checkoutRedirectOnly(checkout, primaryDomain) {
  var target = checkoutWindowTarget()

  if (hasCustomDomain(checkout)) {
    customDomainRedirect(checkout, primaryDomain, target)
  }

  return managedDomainRedirect(checkout, target)
}

function hasDiscount(checkout) {
  /* @if NODE_ENV='pro' */
  var hasCustomDiscount = wp.hooks.applyFilters('set.checkout.discount', false, checkout)

  if (hasCustomDiscount) {
    return hasCustomDiscount
  }
  /* @endif */

  return false
}

async function checkoutRedirect(checkout, componentDispatch, primaryDomain) {
  const discountCode = hasDiscount(checkout)

  wp.hooks.doAction('before.checkout.redirect', checkout)

  if (discountCode) {
    var [err, resp] = await to(addDiscount(discountCode, checkout))

    if (err) {
      console.error('WP Shopify error ', err)
      componentDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __t(err),
        },
      })

      componentDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return
    }

    checkoutRedirectOnly(resp, primaryDomain)

    return
  }

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
  // window.location.href = url; (open in same window)
  window.open(checkoutUrl, target)
}

function customDomainRedirect(checkout, primaryDomain, target) {
  console.log('checkout.webUrl', checkout.webUrl)
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(
      checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl)
    )
  } else {
    var checkoutUrl = checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl)
  }

  console.log('checkoutUrl', checkoutUrl)

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
    console.log('shopInfo', shopInfo)

    if (shopInfoErrors) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __t(shopInfoErrors),
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
          message: __t(checkoutWithLineitemsError),
        },
      })
    }

    if (isEmpty(checkoutWithLineitems.lineItems)) {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false })
      return cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __t('No line items exist '),
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
            message: __t(checkoutWithAttrsError),
          },
        })
      }

      return checkoutRedirect(checkoutWithAttrs, cartDispatch, shopInfo.primaryDomain)
    }

    checkoutRedirect(checkoutWithLineitems, cartDispatch, shopInfo.primaryDomain)
  }

  function buttonStyle() {
    return {
      backgroundColor: wpshopify.settings.general.checkoutColor,
    }
  }

  return (
    <>
      <FilterHook name='before.cart.checkout.button' args={[cartState]} />

      <CartCheckoutButton
        onCheckout={onCheckout}
        buttonStyle={buttonStyle}
        buttonRef={checkoutButton}
      />

      <FilterHook name='after.cart.checkout.button' args={[cartState]} />
    </>
  )
}

function CartCheckoutButton({ buttonStyle, onCheckout, buttonRef }) {
  const [cartState] = useContext(CartContext)

  const checkoutButtonCSS = css`
    font-size: 22px;
    margin-top: 0.5em;
    margin-bottom: 0;
    background-color: ${wpshopify.settings.general.checkoutColor};
    padding: 16px 0 20px 0;
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
        <FilterHook name='cart.checkout.text'>{__t(cartState.checkoutText)}</FilterHook>
      )}
    </button>
  )
}

export { CartCheckout, checkoutRedirect }
