import concat from 'lodash/concat'

function sortAsc(a, b) {
  return a - b
}

function sortPricesAsc(prices) {
  return prices.sort(sortAsc)
}

function convertToFloat(maybeString) {
  return maybeString ? parseFloat(maybeString) : false
}

function pricesArray(product, type) {
  return product.variants.reduce((acc, current) => {
    if (!current[type]) {
      return concat(acc, null)
    }

    return concat(acc, convertToFloat(current[type].amount))
  }, [])
}

function getPrices(product, sort = false) {
  if (sort === 'asc') {
    return {
      regPrices: sortPricesAsc(pricesArray(product, 'priceV2')),
      compareAtPrices: sortPricesAsc(pricesArray(product, 'compareAtPriceV2')),
    }
  }

  return {
    regPrices: pricesArray(product, 'priceV2'),
    compareAtPrices: pricesArray(product, 'compareAtPriceV2'),
  }
}

function getCurrencyCodeFromPayload(payload) {
  if (payload.variants.length) {
    return payload.variants[0].priceV2.currencyCode
  }

  return wp.hooks.applyFilters('misc.pricing.defaultCurrencyCode', 'USD')
}

export { getPrices, getCurrencyCodeFromPayload }
