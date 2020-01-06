import money from "money"
import accounting from "accounting"
import { localCurrency } from "./currency"
import { baseCurrency, showingLocalCurrency } from "../globals"

function convertAmount(amount, fromCode, toCode) {
  if (!toCode) {
    return amount
  }

  if (fromCode === toCode) {
    console.info("WP Shopify ℹ️ Did not convert to local currency")
    return amount
  }

  return accounting.toFixed(
    money(amount)
      .from(fromCode)
      .to(toCode),
    2
  )
}

function convertToLocalCurrency(amount) {
  return convertAmount(amount, baseCurrency(), localCurrency())
}

/*

Format product price into format from Shopify

*/
function maybeConvertPriceToLocalCurrency(amount) {
  if (showingLocalCurrency()) {
    return convertToLocalCurrency(amount)
  }

  return amount
}

export { convertToLocalCurrency, maybeConvertPriceToLocalCurrency }
