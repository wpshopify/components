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

      shopDispatch({ type: 'IS_CART_READY', payload: true })
   }

   async function bootstrapShop() {
      console.log('bootstrapShop 1')

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

      console.log('bootstrapShop 2')

      setShopReady()

      console.log('bootstrapShop 3')

      buildInstances().then(
         async instances => {
            console.log('bootstrapShop 5')
            console.log(instances) // Success!

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

            console.log('bootstrapShop 6')
         },
         error => {
            console.log('bootstrapShop 7')
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

      console.log('bootstrapShop 4')
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
