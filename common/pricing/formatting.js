import has from 'lodash/has'

function hasDecimal(num) {
  return num % 1 != 0
}

function maybeHideDecimals(config, amount) {
  if (!wpshopify.settings.general.hideDecimals) {
    return config
  }

  if (wpshopify.settings.general.hideDecimalsOnlyZeros && !hasDecimal(amount)) {
    config.minimumFractionDigits = 0
    config.maximumFractionDigits = 0
  }

  if (wpshopify.settings.general.hideDecimalsOnlyZeros) {
    config.minimumFractionDigits = 0
    config.maximumFractionDigits = 0
  }

  return config
}

function formatNumber(config) {
  return new Intl.NumberFormat(
    config.locale,
    maybeHideDecimals(
      {
        style: 'currency',
        currency: config.countryCode,
        currencyDisplay: config.currencyDisplay,
      },
      config.amount
    )
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
