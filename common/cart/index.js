import { animeStagger } from '../animations'

function findTotalCartQuantities(lineItems) {
  return lineItems.reduce(function (accumulator, lineItem) {
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

function isCartOpen() {
  return document.querySelector('.wps-cart').classList.contains('wps-cart-is-showing')
}

function animateCartLineItems() {
  animeStagger(document.querySelectorAll('.wps-cart-lineitem'))
}

function getCartElement() {
  return document.querySelector('.wps-cart')
}

export { findTotalCartQuantities, isTotalEmpty, isCartEmpty, isCartOpen }
