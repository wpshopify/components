import React, { useContext } from 'react'
import { usePortal } from '../../../common/hooks'
import { ItemsContext } from '../../items/_state/context'
import { StorefrontContext } from '../_state/context'
import { Products } from '../../products'

function StorefrontItems() {
   const [itemsState] = useContext(ItemsContext)
   const [storefrontState] = useContext(StorefrontContext)

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
