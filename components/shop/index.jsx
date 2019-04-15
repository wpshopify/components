import React, { useReducer, useEffect } from 'react'
import { ShopInitialState } from './initial-state'
import { ShopContext } from './context'
import { ShopReducer } from './reducer'

import uniq from 'lodash/uniq'
import isEmpty from 'lodash/isEmpty'
import { buildInstances, getProducts, getCheckoutCache, getCheckoutID } from '@wpshopify/api'
import to from 'await-to-js'

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

   return await getProducts(uniqueIds)
}

function Shop(props) {
   const [state, dispatch] = useReducer(ShopReducer, ShopInitialState(props))

   /*
   
   Responsible for: Bootstrapping the app
   
   */
   async function bootstrapShop() {
      var [instancesError, instances] = await to(buildInstances())

      if (instancesError) {
         return
      }

      dispatch({ type: 'SET_CHECKOUT', payload: instances.checkout })
      dispatch({ type: 'SET_CHECKOUT_CACHE', payload: instances.checkout })

      var [productsError, products] = await to(getProductIdsFromLineItems())

      if (productsError) {
         console.error('productsError!', productsError)
         return
      }

      if (products) {
         dispatch({ type: 'SET_LINE_ITEMS_AND_VARIANTS', payload: { products: products } })
         dispatch({ type: 'UPDATE_CHECKOUT_TOTAL' })
         dispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
      } else {
         dispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
      }

      // App is ready to go
      dispatch({ type: 'IS_READY' })
   }

   // Bootstrap app on mount only
   useEffect(() => {
      bootstrapShop()
   }, [])

   return (
      <>
         <ShopContext.Provider
            value={{
               shopState: state,
               shopDispatch: dispatch
            }}>
            {props.children}
         </ShopContext.Provider>
      </>
   )
}

export { Shop }
