import React, { useEffect, useContext } from 'react'
import { createHooks } from '@wordpress/hooks'
import { ShopContext } from '../shop/_state/context'
import { bootstrapLocalCurrencyRequirements } from '../../common/pricing/currency'
import { buildInstances } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function setReady() {
      // App is ready to go
      if (wp.hooks) {
         wp.hooks.doAction('after.ready')
      }

      shopDispatch({ type: 'IS_SHOP_READY' })
   }

   /*
   
   Responsible for: Bootstrapping the app
   
   */
   async function bootstrapShop() {
      // If running WP less < 5.0, polyfill the hooks
      if (!wp.hooks) {
         wp.hooks = createHooks()
      }

      wp.hooks.doAction('before.ready')

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
console.log('instancesinstancesinstances', instances)
      if (!instances.checkout) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: "No checkout instance available"
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

         instances = newInstances
      }

      shopDispatch({ type: 'SET_CHECKOUT_ID', payload: instances.checkout.id })
      shopDispatch({ type: 'SET_SHOP_INFO', payload: instances.shop })

      // var [currencyError, currencyResp] = await to(bootstrapLocalCurrencyRequirements())

      // if (currencyError) {
      //    console.error('currencyError!', currencyError)
      //    return
      // }

      setReady()
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
