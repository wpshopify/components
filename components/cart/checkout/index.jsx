import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'

import { Loader } from '../../loader'

import { replaceLineItems, updateCheckoutAttributes } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import isEmpty from 'lodash/isEmpty'
import to from 'await-to-js'

function CartCheckout() {
   const [shopState] = useContext(ShopContext)
   const [cartState, cartDispatch] = useContext(CartContext)

   function handleCheckout() {
      checkout()
   }

   async function checkout() {
      cartDispatch({ type: 'SET_IS_CHECKING_OUT', payload: true })

      const [err, success] = await to(replaceLineItems(shopState.checkoutCache.lineItems))

      if (err) {
         console.log('ERROR! ', err)
         return
      }

      if (!isEmpty(shopState.customAttributes)) {
         const [errAttr, resp] = await to(
            updateCheckoutAttributes({
               customAttributes: shopState.customAttributes,
               note: shopState.note
            })
         )

         window.open(resp.webUrl, WP_Shopify.settings.checkoutButtonTarget)
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

   return (
      <>
         <button className='wps-btn wps-btn-checkout' onClick={handleCheckout} data-wps-is-ready={shopState.isShopReady} disabled={cartState.isCheckingOut}>
            {cartState.isCheckingOut ? <Loader isLoading={cartState.isCheckingOut} /> : cartState.checkoutText}
         </button>
      </>
   )
}

export { CartCheckout }
