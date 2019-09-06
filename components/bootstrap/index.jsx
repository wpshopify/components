import React, { useEffect, useContext } from 'react'
import { createHooks } from '@wordpress/hooks'
import { ShopContext } from '../shop/_state/context'
import { hasHooks } from '../../common/utils'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function setReady() {
      // App is ready to go
      hasHooks() && wp.hooks.doAction('after.ready', shopState.settings)

      shopDispatch({ type: 'IS_SHOP_READY' })
   }

   async function bootstrapShop() {
      console.log('📦 React Bootstrap 1 :: hasHooks() ', hasHooks())

      // If running WP less < 5.0, polyfill the hooks
      if (hasHooks()) {
         wp.hooks.doAction('before.ready', shopState.settings)
      } else {
         console.log('📦 React Bootstrap 2 :: wp ', wp)

         if (typeof wp === 'undefined') {
            window.wp = {}
            wp.hooks = createHooks()
         } else {
            wp.hooks = createHooks()
         }

         console.log('📦 React Bootstrap 3 :: wp ', wp)
      }

      var [errorInstances, instances] = await to(buildInstances())

      console.log('📦 React Bootstrap 4 :: errorInstances ', errorInstances)
      console.log('📦 React Bootstrap 4 :: instances ', instances)

      if (errorInstances) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: errorInstances
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
         console.log('📦 React Bootstrap 5 :: instances.checkout.completedAt ', instances.checkout.completedAt)

         var [buildInstancesError, newInstances] = await to(buildInstances(true))

         console.log('📦 React Bootstrap 5 :: buildInstancesError ', buildInstancesError)
         console.log('📦 React Bootstrap 5 :: newInstances ', newInstances)

         if (buildInstancesError) {
            shopDispatch({
               type: 'UPDATE_NOTICES',
               payload: {
                  type: 'error',
                  message: buildInstancesError
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

      console.log('📦 React Bootstrap 6 :: instances.checkout ', instances.checkout)
      console.log('📦 React Bootstrap 6 :: instances.shop ', instances.shop)

      setReady()
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
