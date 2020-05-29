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

function isSyncingPosts() {
  return wpshopify.settings.general.is_syncing_posts
}

function isDisablingDefaultPages() {
  return wpshopify.settings.general.disable_default_pages
}

function hasSinglePage() {
  if (isDisablingDefaultPages()) {
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

function onSinglePage(itemsState) {
  return itemsState.payloadSettings.isSingular
}

function hasLink(itemsState) {
  if (!itemsState) {
    return false
  }

  if (itemsState.payloadSettings.linkTo === 'none') {
    return false
  }

  if (itemsState.payloadSettings.linkTo === 'shopify') {
    return true
  }

  if (liteSyncAndWordPressLink(itemsState)) {
    return false
  }

  return hasSinglePage() && !onSinglePage(itemsState)
}

function hasCustomButtonText(itemsState) {
  if (!itemsState.payloadSettings.addToCartButtonText) {
    return false
  }
  if (
    itemsState.payloadSettings.addToCartButtonText != 'Checkout' ||
    itemsState.payloadSettings.addToCartButtonText != 'Add to cart' ||
    itemsState.payloadSettings.addToCartButtonText != 'View product'
  ) {
    return true
  }

  return false
}

function getButtonText(itemsState, isDirectCheckout) {
  if (hasCustomButtonText(itemsState)) {
    return wp.i18n.__(itemsState.payloadSettings.addToCartButtonText, 'wpshopify')
  }

  if (isDirectCheckout) {
    return wp.i18n.__('Checkout', 'wpshopify')
  }

  if (hasLink(itemsState)) {
    return wp.i18n.__('View product', 'wpshopify')
  }

  if (itemsState.payloadSettings.addToCartButtonText === 'View product') {
    return wp.i18n.__('View product', 'wpshopify')
  }

  if (itemsState.payloadSettings.addToCartButtonText === 'Checkout') {
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
    return getShopifySingleLink(payload, type)
  }

  if (linkTo === 'wordpress') {
    return getWordPressSingleLink(payload)
  }
}

function liteSyncAndWordPressLink(itemsState) {
  return wpshopify.settings.general.isLiteSync && itemsState.payloadSettings.linkTo == 'wordpress'
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
