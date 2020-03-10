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

function hasLink(itemsState, shop) {
  console.log('hasLink 1', shop)

  if (itemsState.payloadSettings.linkTo === 'none') {
    return false
  }

  if (itemsState.payloadSettings.linkTo === 'shopify') {
    return true
  }
  console.log('hasLink 2', itemsState)
  if (liteSyncAndWordPressLink(itemsState, shop)) {
    console.log('hasLink 3')
    return false
  }
  console.log('hasLink 4')
  return hasSinglePage() && !onSinglePage(itemsState)
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
  console.log('.... linkTo', linkTo)

  if (linkTo === 'none') {
    return false
  }

  if (linkTo === 'shopify') {
    // Manual links
    return getShopifySingleLink(payload, shopInfo, type)
  }

  if (linkTo === 'wordpress') {
    return getWordPressSingleLink(payload)
  }
}

function liteSyncAndWordPressLink(itemsState, shop) {
  return shop.settings.isLiteSync && itemsState.payloadSettings.linkTo == 'wordpress'
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
  isLiteSync
}
