import filter from 'lodash/filter'
import merge from 'lodash/merge'
import head from 'lodash/head'
import { createObj } from '../utils'

function getAvailableVariants(product) {
   let combinations = product.variants.map(variant => {
      return variant.selectedOptions.map(selectableOption => createObj(selectableOption.name, selectableOption.value))
   })

   return combinations.map(combination => {
      return merge(...combination)
   })
}

function isAvailable(item) {
   if (item.availableForSale) {
      return true
   }

   if (item.available) {
      return true
   }

   return false
}

function onlyAvailableItems(items) {
   return items.filter(item => isAvailable)
}

function filterAvailableVariantsBySelectedOption(product, selectedOption) {
   return filter(getAvailableVariants(product), selectedOption)
}

function calcLineItemTotal(price, quantity) {
   return Number(price) * Number(quantity)
}

function getVariantFromLineItem(checkoutVariants, lineItem) {
   return head(filter(checkoutVariants, vari => vari.id === lineItem.variantId))
}

function calcCheckoutTotal(checkoutState) {
   var checkoutStateCopy = checkoutState

   return checkoutState.lineItems.reduce((accumulator, lineItem) => {
      return calcCheckoutTotalReducer(accumulator, lineItem, checkoutStateCopy)
   }, 0)
}

function calcCheckoutTotalReducer(accumulator, lineItem, checkoutState) {
   var variant = getVariantFromLineItem(checkoutState.variants, lineItem)

   // If variant was removed from the store, these will be undefined
   if (!variant || !lineItem) {
      return accumulator
   }

   accumulator += calcLineItemTotal(lineItem.quantity, variant.price)

   return accumulator
}

export { getAvailableVariants, filterAvailableVariantsBySelectedOption, calcLineItemTotal, calcCheckoutTotal, isAvailable, onlyAvailableItems }
