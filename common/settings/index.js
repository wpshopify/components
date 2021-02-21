import has from 'lodash/has';
import { createSlug } from '../utils';

function hasEnableCustomCheckoutDomain() {
  return wpshopify.settings.general.enableCustomCheckoutDomain;
}

function productsLinkTo() {
  return wpshopify.settings.general.productsLinkTo;
}

function hasLink(payloadSettings) {
  if (!payloadSettings) {
    return false;
  }

  if (payloadSettings.linkTo === 'none') {
    return false;
  }

  if (payloadSettings.linkTo === 'shopify') {
    return true;
  }

  if (wpshopify.settings.general.enableDefaultPages && !payloadSettings.isSingular) {
    return true;
  }

  return false;
}

function hasCustomButtonText(payloadSettings) {
  if (
    payloadSettings.addToCartButtonText != 'Checkout' &&
    payloadSettings.addToCartButtonText != 'Add to cart' &&
    payloadSettings.addToCartButtonText != 'View product'
  ) {
    return true;
  }

  return false;
}

function getButtonText(payloadSettings, isDirectCheckout, linkWithBuyButton) {
  if (hasCustomButtonText(payloadSettings)) {
    return payloadSettings.addToCartButtonText;
  }

  if (isDirectCheckout) {
    return wp.i18n.__('Checkout', 'wpshopify');
  }

  if (linkWithBuyButton) {
    return wp.i18n.__('Add to cart', 'wpshopify');
  }

  if (hasLink(payloadSettings)) {
    return wp.i18n.__('View product', 'wpshopify');
  }

  if (payloadSettings.addToCartButtonText === 'View product') {
    return wp.i18n.__('View product', 'wpshopify');
  }

  if (payloadSettings.addToCartButtonText === 'Checkout') {
    return wp.i18n.__('Checkout', 'wpshopify');
  }

  return wp.i18n.__('Add to cart', 'wpshopify');
}

function shopHasInfo(shop) {
  return has(shop, 'info');
}

function getShopifySingleLink(payload, type) {
  if (!payload.onlineStoreUrl) {
    const handle = encodeURI(payload.handle);
    return (
      'https://' +
      wpshopify.settings.connection.storefront.domain +
      '/' +
      type +
      '/' +
      handle
    );
  }

  return payload.onlineStoreUrl;
}

function maybeAddSlashAtStart(string) {
  if (string.startsWith('http')) {
    return string;
  }

  // Ensure first character is forward slash
  if (string.charAt(0) !== '/') {
    string = '/' + string;
  }

  return string;
}

function maybeAddSlashAtEnd(string) {
  // Ensure last character is forward slash
  if (string.charAt(string.length - 1) !== '/') {
    string = string + '/';
  }

  return string;
}

function getWordPressSingleLink(payload) {
  let itemHandle = '';
  let url = '';

  if (has(payload, 'handle')) {
    itemHandle = createSlug(payload.handle);
  } else if (has(payload, 'productTitle')) {
    itemHandle = createSlug(payload.productTitle);
  }

  if (payload.type.name === 'Collection') {
    url = wpshopify.settings.general.urlCollections;
  } else if (payload.type.name === 'Product' || payload.type.name === 'ProductVariant') {
    url = wpshopify.settings.general.urlProducts;
  }

  url = maybeAddSlashAtEnd(maybeAddSlashAtStart(url));

  const finalURL = url + itemHandle;

  return finalURL;
}

function getItemLink(payload, type, linkTo) {
  if (linkTo === 'none') {
    return false;
  }

  // Manual links
  if (linkTo === 'shopify') {
    return getShopifySingleLink(payload, type);
  }

  if (linkTo === 'wordpress') {
    return encodeURI(getWordPressSingleLink(payload));
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
};
