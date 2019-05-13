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
   console.log('itemsState.componentOptions <<<<<<<<<>>>>>>>>>>')

   const productOptions = {
      payload: itemsState.payload[0].products,
      componentOptions: { ...itemsState.componentOptions.products },
      element: false,
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
      queryParams: {
         first: parseInt(itemsState.componentOptions.products.pageSize),
         reverse: itemsState.componentOptions.products.reverse,
         sortKey: itemsState.componentOptions.products.sortBy
      }
   }

   return (
      <div className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item`}>
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
