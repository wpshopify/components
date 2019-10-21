function showingLocalCurrency() {
   return WP_Shopify.settings.pricing.enableLocalCurrency
}

function baseCurrency() {
   return WP_Shopify.settings.pricing.baseCurrencyCode
}

function showingCurrencyCode() {
   return WP_Shopify.settings.hasCurrencyCode
}

function currencyDisplayStyle() {
   return WP_Shopify.settings.pricingCurrencyDisplayStyle
}

function textDomain() {
   return WP_Shopify.settings.textdomain
}

function hideDecimals() {
   return WP_Shopify.settings.pricing.hideDecimals
}

function hideDecimalsAll() {
   return WP_Shopify.settings.pricing.hideDecimalsAll
}

function hideDecimalsOnlyZeros() {
   return WP_Shopify.settings.pricing.hideDecimalsOnlyZeros
}

export { showingLocalCurrency, baseCurrency, showingCurrencyCode, currencyDisplayStyle, textDomain, hideDecimals, hideDecimalsAll, hideDecimalsOnlyZeros }
