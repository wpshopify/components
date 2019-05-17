import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'
import { replaceLineItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function CartCheckout() {
   const [shopState] = useContext(ShopContext)
   const [cartState] = useContext(CartContext)

   function handleCheckout() {
      console.log('checkout ::', shopState.checkout)
      console.log('checkout id ::', shopState.checkout.id)
      console.log('checkout webUrl ::', shopState.checkout.webUrl)
      console.log('lineItems ::', shopState.checkoutCache.lineItems)
      console.log('checkoutButtonTarget', WP_Shopify.settings.checkoutButtonTarget)

      addstuff()
   }

   async function addstuff() {
      const [err, success] = await to(replaceLineItems(shopState.checkoutCache.lineItems))

      if (err) {
         console.log('ERROR! ', err)
      } else {
         window.open(success.webUrl, WP_Shopify.settings.checkoutButtonTarget)
      }
   }

   function createLineItems() {
      return [
         {
            variantId: variant.id,
            quantity: parseInt(productQuantity)
         }
      ]
   }

   useEffect(function() {
      console.log('CHECKOUT INIT RENDER')
      document.addEventListener('wpshopify-checkout-attributes', function(e) {
         console.log('HIIIIIIII : ', e)
      })
   }, [])

   return (
      <>
         <button className='wps-btn wps-btn-checkout' onClick={handleCheckout} data-wps-is-ready={shopState.isShopReady}>
            {cartState.checkoutText}
         </button>
      </>
   )
}

export { CartCheckout }
