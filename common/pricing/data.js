import concat from 'lodash/concat';

function sortAsc(a, b) {
  return a - b;
}

function sortPricesAsc(prices) {
  return prices.sort(sortAsc);
}

function convertToFloat(maybeString) {
  return maybeString ? parseFloat(maybeString) : false;
}

function pricesArray(product, type) {
  return product.variants.reduce((acc, current) => {
    if (!current[type]) {
      return concat(acc, null);
    }

    return concat(acc, convertToFloat(current[type].amount));
  }, []);
}

function getPrices(product, sort = false) {
  if (sort === 'asc') {
    return {
      regPrices: sortPricesAsc(pricesArray(product, 'priceV2')),
      compareAtPrices: sortPricesAsc(pricesArray(product, 'compareAtPriceV2')),
    };
  }

  return {
    regPrices: pricesArray(product, 'priceV2'),
    compareAtPrices: pricesArray(product, 'compareAtPriceV2'),
  };
}

function getCurrencyCodeFromPayload(payload) {
  var defaultCode = 'USD';

  if (payload.variants.length) {
    defaultCode = payload.variants[0].priceV2.currencyCode;
  }

  return wp.hooks.applyFilters('misc.pricing.defaultCurrencyCode', defaultCode);
}

function shouldShowSaleNotice(selectedVariant = false, prices = false) {
  if (!selectedVariant && prices) {
    if (!prices.compareAtPrices[0] || !prices.regPrices[0]) {
      return false;
    }

    return prices.compareAtPrices[0] !== prices.regPrices[0];
  }

  if (!selectedVariant.compareAtPriceV2 || !selectedVariant.compareAtPriceV2.amount) {
    return false;
  }

  if (!selectedVariant.priceV2 || !selectedVariant.priceV2.amount) {
    return false;
  }

  return selectedVariant.compareAtPriceV2.amount !== selectedVariant.priceV2.amount;
}

function getSalePrice(selectedVariant = false, prices = false) {
  if (!wpshopify.misc.isPro) {
    return false;
  }

  if (!selectedVariant && prices) {
    return prices.compareAtPrices[0];
  }

  return selectedVariant.compareAtPriceV2.amount;
}

export { getPrices, getCurrencyCodeFromPayload, shouldShowSaleNotice, getSalePrice };
