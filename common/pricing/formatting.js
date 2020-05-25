import has from 'lodash/has'

function maybeHideDecimals(config) {
  console.log('config ................', config)

  if (!wpshopify.settings.general.hideDecimals) {
    return config
  }

  config.minimumFractionDigits = 0
  config.maximumFractionDigits = 0

  return config
}

function formatNumber(config) {
  return new Intl.NumberFormat(
    config.locale,
    maybeHideDecimals({
      style: 'currency',
      currency: config.countryCode,
      currencyDisplay: config.currencyDisplay,
    })
  ).format(config.amount)
}

/*

locale currently not used

Config: {
  locale: 'en-US',
  countryCode: 'US',
  amount: 123,
}

*/
function formatPrice(config) {
  // Uses the browser locale by default
  if (!has(config, 'locale')) {
    config.locale = false
  }

  return formatNumber(config)
}

/*

"price" should always be preformatted

*/
function formatPriceToCurrency(price, currencyCode) {
  return formatPrice({
    countryCode: currencyCode, // getLocalCurrencyCodeCache(), maybeConvertPriceToLocalCurrency
    amount: price,
    currencyDisplay: wpshopify.settings.general.currencyDisplayStyle,
  })
}

export { formatPrice, formatPriceToCurrency }
