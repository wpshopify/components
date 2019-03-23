function showingLocalCurrency() {
   return WP_Shopify.settings.pricing.enableLocalCurrency
}

function baseCurrency() {
   return WP_Shopify.settings.pricing.baseCurrencyCode
}

function showingCurrencyCode() {
   return WP_Shopify.settings.hasCurrencyCode
}

export { showingLocalCurrency, baseCurrency, showingCurrencyCode }
