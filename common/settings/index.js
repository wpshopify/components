import has from 'lodash/has'
import { convertTitleToHandle } from '../utils'

function hasEnableCustomCheckoutDomain() {
  return wpshopify.settings.general.enableCustomCheckoutDomain
}

function productsLinkTo() {
  return wpshopify.settings.general.productsLinkTo
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

  if (wpshopify.settings.general.enableDefaultPages && !payloadSettings.isSingular) {
    return true
  }

  return false
}

function hasCustomButtonText(payloadSettings) {
  if (
    payloadSettings.addToCartButtonText != 'Checkout' &&
    payloadSettings.addToCartButtonText != 'Add to cart' &&
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

function getShopifySingleLink(payload, type) {
  if (!payload.onlineStoreUrl) {
    return (
      'https://' +
      wpshopify.settings.connection.storefront.domain +
      '/' +
      type +
      '/' +
      payload.handle
    )
  }

  return payload.onlineStoreUrl
}

function getWordPressSingleLink(payload) {
  let itemHandle = ''
  let url = ''

  if (has(payload, 'handle')) {
    itemHandle = payload.handle
  } else if (has(payload, 'productTitle')) {
    itemHandle = convertTitleToHandle(payload.productTitle)
  }

  if (payload.type.name === 'Collection') {
    url = wpshopify.settings.general.urlCollections
  } else if (payload.type.name === 'Product' || payload.type.name === 'ProductVariant') {
    url = wpshopify.settings.general.urlProducts
  }

  return url + itemHandle
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

export {
  hasEnableCustomCheckoutDomain,
  hasLink,
  getShopifySingleLink,
  getWordPressSingleLink,
  productsLinkTo,
  getItemLink,
  shopHasInfo,
  hasCustomButtonText,
  getButtonText,
}
