import has from 'lodash/has'
import { convertTitleToHandle } from '../utils'

/*

hasEnableCustomCheckoutDomain

*/
function hasEnableCustomCheckoutDomain() {
   return WP_Shopify.settings.enableCustomCheckoutDomain
}

/*

hasCurrencyCode

*/
function hasCurrencyCode() {
   return WP_Shopify.settings.hasCurrencyCode
}

function singleIsShopify() {
   return WP_Shopify.settings.itemsLinkToShopify
}

function isLiteSync() {
   return WP_Shopify.settings.isLiteSync
}

function isSyncingPosts() {
   return WP_Shopify.settings.isSyncingPosts
}

function hasSinglePage() {
   if (isLiteSync()) {
      return false
   }

   if (!singleIsShopify() && !isSyncingPosts()) {
      return false
   }

   return true
}

function getShopifySingleLink(payload, shop, type) {
   if (!payload.onlineStoreUrl) {
      if (has(shop, 'info')) {
         return shop.info.primaryDomain.url + '/' + type + '/' + payload.handle
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
      urlBase = WP_Shopify.settings.urlCollections
   } else if (payload.type.name === 'Product' || payload.type.name === 'ProductVariant') {
      urlBase = WP_Shopify.settings.urlProducts
   }

   return urlBase + '/' + itemHandle
}

function getItemLink(payload, shop, type) {
   if (singleIsShopify()) {
      return getShopifySingleLink(payload, shop, type)
   } else {
      return getWordPressSingleLink(payload)
   }
}

export { hasEnableCustomCheckoutDomain, hasCurrencyCode, hasSinglePage, getShopifySingleLink, getWordPressSingleLink, singleIsShopify, getItemLink }
