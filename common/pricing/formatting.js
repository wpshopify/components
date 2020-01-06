import has from "lodash/has"
import { hasCurrencyCode } from "../settings"
import { getMoneyFormat, getShop } from "../shop"
import { getLocalCurrencyCodeCache } from "./currency"
import { maybeConvertPriceToLocalCurrency } from "./conversion"
import {
  currencyDisplayStyle,
  showingCurrencyCode,
  showingLocalCurrency,
  hideDecimals,
  hideDecimalsOnlyZeros
} from "../globals"

function hasDecimal(num) {
  return num % 1 != 0
}

function maybeHideDecimals(config, amount) {
  if (!hideDecimals()) {
    return config
  }

  if (hideDecimalsOnlyZeros()) {
    if (!hasDecimal(amount)) {
      config.minimumFractionDigits = 0
      config.maximumFractionDigits = 0
    }
  } else if (hideDecimalsOnlyZeros()) {
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
        style: "currency",
        currency: config.countryCode,
        currencyDisplay: config.currencyDisplay
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
  if (!has(config, "locale")) {
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
    currencyDisplay: currencyDisplayStyle()
  })
}

export { formatPrice, formatPriceToCurrency }
