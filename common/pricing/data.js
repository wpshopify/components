import concat from 'lodash/concat'
import compact from 'lodash/compact'

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
  return compact(
    product.variants.reduce((acc, current) => {
      if (!current[type]) {
        return acc
      }

      return concat(acc, convertToFloat(current[type].amount))
    }, [])
  )
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

  return 'USD'
}

export { getPrices, getCurrencyCodeFromPayload }
