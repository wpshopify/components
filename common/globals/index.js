function showingLocalCurrency() {
  return false
}

function baseCurrency() {
  return 'USD'
}

function showingCurrencyCode() {
  return wpshopify.settings.general.price_with_currency
}

function currencyDisplayStyle() {
  return wpshopify.settings.general.currency_display_style
}

function textDomain() {
  return wpshopify.misc.textdomain
}

function hideDecimals() {
  return wpshopify.settings.general.hide_decimals
}

function hideDecimalsAll() {
  return wpshopify.settings.general.hide_decimals_all
}

function hideDecimalsOnlyZeros() {
  return wpshopify.settings.general.hide_decimals_only_zeros
}

export {
  showingLocalCurrency,
  baseCurrency,
  showingCurrencyCode,
  currencyDisplayStyle,
  textDomain,
  hideDecimals,
  hideDecimalsAll,
  hideDecimalsOnlyZeros
}
