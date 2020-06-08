import has from 'lodash/has'
import { convertTitleToHandle } from '../utils'

/*

hasEnableCustomCheckoutDomain

*/
function hasEnableCustomCheckoutDomain() {
  return wpshopify.settings.general.enable_custom_checkout_domain
}

function productsLinkTo() {
  return wpshopify.settings.general.products_link_to
}

function isLiteSync() {
  return wpshopify.settings.general.is_lite_sync
}

function enableDefaultPages() {
  return wpshopify.settings.general.enable_default_pages
}

function hasSinglePage() {
  if (!enableDefaultPages()) {
    return false
  }

  if (productsLinkTo() === 'none') {
    return false
  }

  if (isLiteSync()) {
    return false
  }

  return true
}

function onSinglePage(payloadSettings) {
  return payloadSettings.isSingular
}

function hasLink(payloadSettings) {
  if (!payloadSettings) {
    return false
  }

  if (payloadSettings.linkTo === 'none') {
    return false
  }

  if (payloadSettings.linkTo === 'shopify') {
    return true
  }

  if (liteSyncAndWordPressLink(payloadSettings.linkTo)) {
    return false
  }

  return hasSinglePage() && !onSinglePage(payloadSettings)
}

function hasCustomButtonText(payloadSettings) {
  if (!payloadSettings.addToCartButtonText) {
    return false
  }
  if (
    payloadSettings.addToCartButtonText != 'Checkout' ||
    payloadSettings.addToCartButtonText != 'Add to cart' ||
    payloadSettings.addToCartButtonText != 'View product'
  ) {
    return true
  }

  return false
}

function getButtonText(payloadSettings, isDirectCheckout) {
  if (hasCustomButtonText(payloadSettings)) {
    return payloadSettings.addToCartButtonText
  }

  if (isDirectCheckout) {
    return wp.i18n.__('Checkout', 'wpshopify')
  }

  if (hasLink(payloadSettings)) {
    return wp.i18n.__('View product', 'wpshopify')
  }

  if (payloadSettings.addToCartButtonText === 'View product') {
    return wp.i18n.__('View product', 'wpshopify')
  }

  if (payloadSettings.addToCartButtonText === 'Checkout') {
    return wp.i18n.__('Checkout', 'wpshopify')
  }

  return wp.i18n.__('Add to cart', 'wpshopify')
}

function shopHasInfo(shop) {
  return has(shop, 'info')
}

function getShopifySingleLink(payload, shopInfo, type) {
  if (!payload.onlineStoreUrl) {
    if (shopInfo) {
      return (
        'https://' +
        wpshopify.settings.connection.storefront.domain +
        '/' +
        type +
        '/' +
        payload.handle
      )
    } else {
      return '#!'
    }
  }

  return payload.onlineStoreUrl
}

function getWordPressSingleLink(payload) {
  let itemHandle = ''
  let urlBase = ''

  if (has(payload, 'handle')) {
    itemHandle = payload.handle
  } else if (has(payload, 'productTitle')) {
    itemHandle = convertTitleToHandle(payload.productTitle)
  }

  if (payload.type.name === 'Collection') {
    urlBase = wpshopify.settings.general.urlCollections
  } else if (payload.type.name === 'Product' || payload.type.name === 'ProductVariant') {
    urlBase = wpshopify.settings.general.urlProducts
  }

  return urlBase + '/' + encodeURI(itemHandle)
}

function getItemLink(payload, type, linkTo) {
  if (linkTo === 'none') {
    return false
  }
  // Manual links
  if (linkTo === 'shopify') {
    return encodeURI(getShopifySingleLink(payload, type))
  }

  if (linkTo === 'wordpress') {
    return encodeURI(getWordPressSingleLink(payload))
  }
}

function liteSyncAndWordPressLink(linkTo) {
  return wpshopify.settings.general.isLiteSync && linkTo == 'wordpress'
}

export {
  hasEnableCustomCheckoutDomain,
  hasSinglePage,
  onSinglePage,
  hasLink,
  liteSyncAndWordPressLink,
  getShopifySingleLink,
  getWordPressSingleLink,
  productsLinkTo,
  getItemLink,
  shopHasInfo,
  isLiteSync,
  hasCustomButtonText,
  getButtonText,
}
