import { useQuery } from 'react-query';
import {
  replaceLineItems,
  updateCheckoutAttributes,
  maybeFetchShop,
  queryOptionsNoRefetch,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import { hasCustomCheckoutAttributes } from '../../../common/checkout';

import isEmpty from 'lodash/isEmpty';
import to from 'await-to-js';

async function onCheckoutQueries(cartState) {
  return new Promise(async (resolve, reject) => {
    var lineItems = wp.hooks.applyFilters(
      'before.checkout.lineItems',
      cartState.checkoutCache.lineItems,
      cartState
    );

    const [shopInfoErrors, shopInfo] = await to(maybeFetchShop());

    if (shopInfoErrors) {
      return reject(shopInfoErrors);
    }

    const [checkoutWithLineitemsError, checkoutWithLineitems] = await to(
      replaceLineItems(lineItems)
    );

    if (checkoutWithLineitemsError) {
      return reject(checkoutWithLineitemsError);
    }

    if (isEmpty(checkoutWithLineitems.lineItems)) {
      return reject(wp.i18n.__('No line items exist', 'wpshopify'));
    }

    if (hasCustomCheckoutAttributes(cartState)) {
      const [checkoutWithAttrsError, checkoutWithAttrs] = await to(
        updateCheckoutAttributes({
          customAttributes: cartState.customAttributes,
          note: cartState.note,
        })
      );

      if (checkoutWithAttrsError) {
        return reject(checkoutWithAttrsError);
      }

      return resolve({
        checkout: checkoutWithAttrs,
        shopInfo: shopInfo,
      });
    }

    return resolve({
      checkout: checkoutWithLineitems,
      shopInfo: shopInfo,
    });
  });
}

function useCheckout(cartState, cartDispatch, afterRedirect) {
  return useQuery(
    'cart::checkout',
    () => {
      return onCheckoutQueries(cartState);
    },
    {
      enabled: cartState.isCheckingOut,
      onError: (error) => {
        cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: false });

        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });
      },
      onSuccess: (data) => {
        checkoutRedirect(data.checkout, data.shopInfo.primaryDomain.url, afterRedirect);
      },
      ...queryOptionsNoRefetch,
    }
  );
}

function checkoutRedirect(checkout, primaryDomain = false, cb = false) {
  wp.hooks.doAction('before.checkout.redirect', checkout);

  checkoutRedirectOnly(checkout, primaryDomain, cb);
}

function checkoutRedirectOnly(checkout, primaryDomain, cb = false) {
  var target = checkoutWindowTarget();

  if (wpshopify.settings.general.enableCustomCheckoutDomain) {
    return customDomainRedirect(checkout, primaryDomain, target, cb);
  }

  return managedDomainRedirect(checkout, target, cb);
}

function checkoutWindowTarget() {
  if (wpshopify.misc.isMobile) {
    return '_self';
  }

  return wpshopify.settings.general.checkoutButtonTarget;
}

function customDomainRedirect(checkout, primaryDomain, target, cb = false) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(
      checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl)
    );
  } else {
    var checkoutUrl = checkoutUrlWithCustomDomain(primaryDomain, checkout.webUrl);
  }

  redirect(checkoutUrl, target, cb);
}

function managedDomainRedirect(checkout, target, cb = false) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(checkout.webUrl);
  } else {
    var checkoutUrl = checkout.webUrl;
  }

  redirect(checkoutUrl, target, cb);
}

function hasGaLoaded() {
  return window.ga !== undefined;
}

function decorateCheckoutUrl(link) {
  if (!window.gaplugins || !window.gaplugins.Linker || !window.ga.getAll) {
    return link;
  }

  var tracker = ga.getAll()[0];
  var linker = new window.gaplugins.Linker(tracker);

  return linker.decorate(link);
}

function extractCheckoutURL(webUrl) {
  return webUrl.split('myshopify.com')[1];
}

function checkoutUrlWithCustomDomain(primaryDomain, webUrl) {
  if (!primaryDomain || (webUrl && !webUrl.includes('myshopify.com'))) {
    return webUrl;
  }

  return primaryDomain + extractCheckoutURL(webUrl);
}

function redirect(checkoutUrl, target, cb = false) {
  window.open(wp.hooks.applyFilters('checkout.url', encodeURI(checkoutUrl)), target);

  if (cb) {
    cb();
  }
}

export { useCheckout, checkoutRedirect };
