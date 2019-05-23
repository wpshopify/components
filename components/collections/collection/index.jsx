import React, { useContext } from 'react'

import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { ItemsContext } from '../../items/_state/context'
import { CollectionProvider } from './_state/provider'
import { PaginationContext } from '../../pagination/_state/context'

import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'
import { Items } from '../../items'
import { Products } from '../../products'

function Collection({ payload }) {
   const [itemsState] = useContext(ItemsContext)
   const [paginationState] = useContext(PaginationContext)

   console.log('payload.products', payload.products)

   const productOptions = [
      {
         componentPayload: payload.products,
         componentOptions: { ...itemsState.componentOptions.products },
         componentConnectionParams: paginationState.componentOptions.componentConnectionParams,
         componentElement: false,
         dataType: 'products',
         type: 'list',
         noResultsText: 'Sorry from products!',
         originalParams: {
            type: 'collections',
            queryParams: itemsState.queryParams,
            connectionParams: {
               first: parseInt(itemsState.componentOptions.products.pageSize),
               reverse: itemsState.componentOptions.products.reverse,
               sortKey: itemsState.componentOptions.products.sortBy
            }
         },
         componentQueryParams: {
            first: parseInt(itemsState.componentOptions.products.pageSize),
            reverse: itemsState.componentOptions.products.reverse,
            sortKey: itemsState.componentOptions.products.sortBy
         }
      }
   ]
   console.log('itemsState.componentOptions', itemsState.componentOptions)

   return (
      <div className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item p-3`}>
         <CollectionProvider payload={payload}>
            {isShowingComponent(itemsState, 'image') && <CollectionImage />}
            {isShowingComponent(itemsState, 'title') && <CollectionTitle />}
            {isShowingComponent(itemsState, 'description') && <CollectionDescription />}
            {itemsState.componentOptions.single && (
               <Items options={productOptions}>
                  <Products />
               </Items>
            )}
         </CollectionProvider>
      </div>
   )
}

export { Collection }
