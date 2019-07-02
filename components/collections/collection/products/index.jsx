import React, { useContext, useEffect } from 'react'
import { findPortalElement } from '../../../../common/utils'
import { usePortal } from '../../../../common/hooks'
import { Items } from '../../../items'
import { Products } from '../../../products'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { PaginationContext } from '../../../pagination/_state/context'

function CollectionProducts() {
   const [collectionState, collectionDispatch] = useContext(CollectionContext)
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)

   console.log('collectionState.products', collectionState.products)

   const productOptions = [
      {
         componentPayload: collectionState.products,
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

   return usePortal(
      <Items options={productOptions}>
         <Products />
      </Items>,
      findPortalElement(itemsState.element, itemsState.componentOptions.dropzoneCollectionProducts)
   )
}

export { CollectionProducts }
