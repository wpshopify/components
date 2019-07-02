function findTotalCartQuantities(lineItems) {
   return lineItems.reduce(function(accumulator, lineItem) {
      accumulator += lineItem.quantity
      return accumulator
   }, 0)
}

function isTotalEmpty(total) {
   return total === 0
}

function isCartEmpty(lineitems) {
   return isTotalEmpty(findTotalCartQuantities(lineitems))
}

function isCartOpen() {}

export { findTotalCartQuantities, isTotalEmpty, isCartEmpty }
