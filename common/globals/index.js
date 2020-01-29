function showingLocalCurrency() {
  return false
}

function baseCurrency() {
  return 'USD'
}

function showingCurrencyCode() {
  return wpshopify.settings.general.priceWithCurrency
}

function currencyDisplayStyle() {
  return wpshopify.settings.general.currencyDisplayStyle
}

function textDomain() {
  return wpshopify.misc.textdomain
}

function hideDecimals() {
  return wpshopify.settings.general.hideDecimals
}

function hideDecimalsAll() {
  return wpshopify.settings.general.hideDecimalsAll
}

function hideDecimalsOnlyZeros() {
  return wpshopify.settings.general.hideDecimalsOnlyZeros
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
