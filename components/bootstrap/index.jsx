import React, { useEffect, useContext } from 'react'
import { createHooks } from '@wordpress/hooks'
import { ShopContext } from '../shop/_state/context'
import { hasHooks } from '../../common/utils'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function setShopReady() {
      // App is ready to go
      hasHooks() && wp.hooks.doAction('after.ready', shopState.settings)

      shopDispatch({ type: 'IS_SHOP_READY' })
   }

   function setCartReady(instances = false) {
      // Cart is ready to go
      hasHooks() && wp.hooks.doAction('after.cart.ready', shopState.settings)

      if (instances) {
         shopDispatch({ type: 'SET_CHECKOUT_ID', payload: instances.checkout.id })
         shopDispatch({ type: 'SET_SHOP_INFO', payload: instances.shop })
      }
   }

   async function bootstrapShop() {
      // If running WP less < 5.0, polyfill the hooks
      if (hasHooks()) {
         wp.hooks.doAction('before.ready', shopState.settings)
      } else {
         if (typeof wp === 'undefined') {
            window.wp = {}
            wp.hooks = createHooks()
         } else {
            wp.hooks = createHooks()
         }
      }

      setShopReady()

      buildInstances().then(
         async instances => {
            if (!instances || !instances.checkout) {
               shopDispatch({
                  type: 'UPDATE_NOTICES',
                  payload: {
                     type: 'error',
                     message: 'No checkout instance available'
                  }
               })

               return setCartReady()
            }

            if (instances.checkout.completedAt) {
               var [buildInstancesError, newInstances] = await to(buildInstances(true))

               if (buildInstancesError) {
                  shopDispatch({
                     type: 'UPDATE_NOTICES',
                     payload: {
                        type: 'error',
                        message: buildInstancesError
                     }
                  })

                  return setCartReady()
               }

               if (!newInstances) {
                  shopDispatch({
                     type: 'UPDATE_NOTICES',
                     payload: {
                        type: 'error',
                        message: 'No store checkout or client instances were found.'
                     }
                  })

                  return setCartReady()
               }

               instances = newInstances
            }

            setCartReady(instances)
         },
         error => {
            shopDispatch({
               type: 'UPDATE_NOTICES',
               payload: {
                  type: 'error',
                  message: error
               }
            })

            return setCartReady()
         }
      )
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
