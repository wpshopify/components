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

export { showingLocalCurrency, baseCurrency, showingCurrencyCode, currencyDisplayStyle }
