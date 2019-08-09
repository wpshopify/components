import React, { useEffect, useContext } from 'react'
import { createHooks } from '@wordpress/hooks'
import { ShopContext } from '../shop/_state/context'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function setReady() {
      // App is ready to go
      if (typeof wp !== 'undefined' && wp.hooks) {
         wp.hooks.doAction('after.ready', shopState.settings)
      }

      shopDispatch({ type: 'IS_SHOP_READY' })
   }

   /*
   
   Responsible for: Bootstrapping the app
   
   */
   async function bootstrapShop() {
      // If running WP less < 5.0, polyfill the hooks
      if (typeof wp !== 'undefined' && wp.hooks) {
         wp.hooks.doAction('before.ready', shopState.settings)
      } else {
         if (typeof wp === 'undefined') {
            window.wp = {}
            wp.hooks = createHooks()
         } else {
            wp.hooks = createHooks()
         }
      }

      var [instancesErrorMsg, instances] = await to(buildInstances())

      if (instancesErrorMsg) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: instancesErrorMsg
            }
         })

         return setReady()
      }

      if (!instances || !instances.checkout) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: 'No checkout instance available'
            }
         })

         return setReady()
      }

      if (instances.checkout.completedAt) {
         var [newInstancesErrorMsg, newInstances] = await to(buildInstances(true))

         if (newInstancesErrorMsg) {
            shopDispatch({
               type: 'UPDATE_NOTICES',
               payload: {
                  type: 'error',
                  message: newInstancesErrorMsg
               }
            })

            return setReady()
         }

         if (!newInstances) {
            shopDispatch({
               type: 'UPDATE_NOTICES',
               payload: {
                  type: 'error',
                  message: 'No store checkout or client instances were found.'
               }
            })

            return setReady()
         }

         instances = newInstances
      }

      shopDispatch({ type: 'SET_CHECKOUT_ID', payload: instances.checkout.id })
      shopDispatch({ type: 'SET_SHOP_INFO', payload: instances.shop })

      setReady()
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
