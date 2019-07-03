import React, { useEffect, useContext } from 'react'
import { createHooks } from '@wordpress/hooks'
import { ShopContext } from '../shop/_state/context'
import { bootstrapLocalCurrencyRequirements } from '../../common/pricing/currency'
import uniq from 'lodash/uniq'
import isEmpty from 'lodash/isEmpty'
import { buildInstances, getProductsFromIds, getCheckoutCache, getCheckoutID } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import CustomEvent from 'custom-event'

function variantsFromCache() {
   var cache = getCheckoutCache(getCheckoutID())

   if (cache && !isEmpty(cache.variants)) {
      return cache.variants
   }

   return []
}

function getUniqueProductIdsFromVariants(variants) {
   return uniq(variants.map(lineItem => lineItem.productId))
}

async function getProductIdsFromLineItems() {
   const uniqueIds = getUniqueProductIdsFromVariants(variantsFromCache())

   if (isEmpty(uniqueIds)) {
      return new Promise(resolve => resolve(false))
   }

   return await getProductsFromIds(uniqueIds)
}

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function setReady(lineItems = false) {
      if (lineItems) {
         shopDispatch({ type: 'SET_LINE_ITEMS_AND_VARIANTS', payload: { products: lineItems } })
         shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
      }

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

      shopDispatch({ type: 'SET_CHECKOUT', payload: instances.checkout })
      shopDispatch({ type: 'SET_CHECKOUT_CACHE', payload: instances.checkout })
      shopDispatch({ type: 'SET_SHOP_INFO', payload: instances.shop })

      var [lineItemsError, lineItems] = await to(getProductIdsFromLineItems())

      if (lineItemsError) {
         shopDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
               type: 'error',
               message: lineItemsError
            }
         })

         return setReady()
      }

      // var [currencyError, currencyResp] = await to(bootstrapLocalCurrencyRequirements())

      // if (currencyError) {
      //    console.error('currencyError!', currencyError)
      //    return
      // }

      setReady(lineItems)
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
