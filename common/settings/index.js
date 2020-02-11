import has from 'lodash/has'
import { convertTitleToHandle } from '../utils'

/*

hasEnableCustomCheckoutDomain

*/
function hasEnableCustomCheckoutDomain() {
  return wpshopify.settings.general.enableCustomCheckoutDomain
}

function singleIsShopify() {
  return wpshopify.settings.general.productsLinkToShopify
}

function isLiteSync() {
  return wpshopify.settings.general.isLiteSync
}

function isSyncingPosts() {
  return wpshopify.settings.general.isSyncingPosts
}

function isDisablingDefaultPages() {
  return wpshopify.settings.general.disableDefaultPages
}

function hasSinglePage() {
  if (singleIsShopify()) {
    return true
  }

  if (!isDisablingDefaultPages() && isSyncingPosts()) {
    return true
  }

  return false
}

function shopHasInfo(shop) {
  return has(shop, 'info')
}

function getShopifySingleLink(payload, shopInfo, type) {
  if (!payload.onlineStoreUrl) {
    if (shopInfo) {
      return shopInfo.primaryDomain.url + '/' + type + '/' + payload.handle
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

function getItemLink(payload, shopInfo, type, linkTo) {
  // Manual links
  if (linkTo === 'shopify') {
    return getShopifySingleLink(payload, shopInfo, type)
  }

  if (linkTo === 'single') {
    return getWordPressSingleLink(payload)
  }

  if (singleIsShopify()) {
    return getShopifySingleLink(payload, shopInfo, type)
  } else {
    return getWordPressSingleLink(payload)
  }
}

export {
  hasEnableCustomCheckoutDomain,
  hasSinglePage,
  getShopifySingleLink,
  getWordPressSingleLink,
  singleIsShopify,
  getItemLink,
  shopHasInfo
}
