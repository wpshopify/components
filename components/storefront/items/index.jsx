import React, { useContext, useEffect } from 'react'
import { usePortal } from '../../../common/hooks'
import { ItemsContext } from '../../items/_state/context'
import { ShopContext } from '../../shop/_state/context'
import { StorefrontContext } from '../_state/context'
import { Products } from '../../products'
import Masonry from 'react-masonry-css'
import mixitup from 'mixitup'
import { animeStaggerFadeIn } from '../../../common/animations'

function StorefrontItems() {
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)
   const [storefrontState] = useContext(StorefrontContext)

   useEffect(
      function() {
         if (itemsState.isLoading) {
            return
         }

         animeStaggerFadeIn(document.querySelectorAll('.wps-item[data-is-first-item="true"], .wps-item[data-is-first-item="true"] ~ div'))
      },
      [shopState.isShopReady, itemsState.isLoading]
   )

   function buildOptions() {
      return {
         payload: itemsState.payload,
         products: itemsState.payload.map(product => {
            return {
               product: product,
               componentID: false,
               element: false,
               gid: false,
               excludes: false,
               renderFromServer: false,
               selectedVariant: false,
               componentOptions: {
                  pagination: true
               }
            }
         }),
         dataType: 'products',
         originalParams: {
            type: 'products',
            queryParams: itemsState.queryParams,
            connectionParams: false
         },
         type: 'storefront',
         componentOptions: itemsState.componentOptions,
         noResultsText: itemsState.componentOptions.noResultsText
      }
   }

   return usePortal(<Products options={buildOptions()} />, document.querySelector(storefrontState.componentOptions.dropzonePayload))
}

export { StorefrontItems }
