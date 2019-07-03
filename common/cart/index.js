import { animeStagger } from '../animations'

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

function isCartOpen() {
   return document.querySelector('.wps-cart').classList.contains('wps-cart-is-showing')
}

function openCart() {
   document.querySelector('.wps-cart').classList.add('wps-cart-is-showing')

   if (wp.hooks) {
      wp.hooks.doAction('on.cart.open')
   }
}

function closeCart() {
   document.querySelector('.wps-cart').classList.remove('wps-cart-is-showing')

   if (wp.hooks) {
      wp.hooks.doAction('on.cart.close')
   }
}

function animateCartLineItems() {
   animeStagger(document.querySelectorAll('.wps-cart-lineitem'))
}

function getCartElement() {
   return document.querySelector('.wps-cart')
}

function toggleCart(opening) {
   const cartElement = getCartElement()

   if (!cartElement) {
      return false
   }

   var listener = function(e) {
      if (!cartElement.contains(e.target)) {
         closeCart()

         document.removeEventListener('mousedown', listener)
         document.removeEventListener('touchstart', listener)
         document.removeEventListener('keydown', escEvent)
      }
   }

   var escEvent = function(event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
         listener(event)
      }
   }

   if (!opening) {
      closeCart()

      return false
   } else {
      openCart()

      animateCartLineItems()

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      document.addEventListener('keydown', escEvent)

      return true
   }
}

export { findTotalCartQuantities, isTotalEmpty, isCartEmpty, toggleCart, isCartOpen }
