import React, { useEffect, useContext } from 'react'
import { ShopContext } from '../shop/_state/context'
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

function addCustomEventProvider() {
   WP_Shopify.dispatch = function(eventName, data) {
      document.dispatchEvent(
         new CustomEvent(eventName, {
            detail: data
         })
      )
   }
}

function Bootstrap({ children }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   /*
   
   Responsible for: Bootstrapping the app
   
   */
   async function bootstrapShop() {
      addCustomEventProvider()

      var [instancesError, instances] = await to(buildInstances())

      if (instancesError) {
         return
      }

      shopDispatch({ type: 'SET_CHECKOUT', payload: instances.checkout })
      shopDispatch({ type: 'SET_CHECKOUT_CACHE', payload: instances.checkout })
      shopDispatch({ type: 'SET_SHOP_INFO', payload: instances.shop })

      var [productsError, products] = await to(getProductIdsFromLineItems())

      if (productsError) {
         console.error('productsError!', productsError)
         return
      }

      if (products) {
         shopDispatch({ type: 'SET_LINE_ITEMS_AND_VARIANTS', payload: { products: products } })
         shopDispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
         shopDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      } else {
         shopDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      }

      // App is ready to go
      shopDispatch({ type: 'IS_SHOP_READY' })
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return <>{children}</>
}

export { Bootstrap }
