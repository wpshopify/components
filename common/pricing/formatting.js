import has from 'lodash/has'
import { hasCurrencyCode } from '../settings'
import { getMoneyFormat, getShop } from '../shop'
import { getLocalCurrencyCodeCache } from './currency'
import { showingCurrencyCode, showingLocalCurrency } from '../globals'

function formatNumber(config) {
   return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.countryCode,
      currencyDisplay: config.currencyDisplay
   }).format(config.amount)
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
function formatPriceToCurrency(price) {
   return formatPrice({
      countryCode: 'USD', // getLocalCurrencyCodeCache()
      amount: price,
      currencyDisplay: showingCurrencyCode() ? 'code' : 'symbol'
   })
}

/*

Format product price into format from Shopify

*/
function maybeformatPriceToCurrency(price) {
   // if ( showingLocalCurrency() ) {
   //   return formatPriceToCurrency(price);
   // }

   return formatPriceToCurrency(price)
}

export { formatPrice, formatPriceToCurrency, maybeformatPriceToCurrency }
