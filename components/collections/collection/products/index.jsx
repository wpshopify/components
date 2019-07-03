import React, { useContext, useEffect, useState, useRef } from 'react'
import { findPortalElement } from '../../../../common/utils'
import { usePortal } from '../../../../common/hooks'
import { Items } from '../../../items'
import { Products } from '../../../products'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { PaginationContext } from '../../../pagination/_state/context'
import update from 'immutability-helper'

function CollectionProducts() {
   const [collectionState, collectionDispatch] = useContext(CollectionContext)
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const isFirstRender = useRef(true)

   // console.log('collectionState productOptions', productOptions)

   function updateCollectionProducts(payload) {
      // console.log('sup! ', payload)
      // console.log('collectionState.products', collectionState.products)
      // console.log('productOptions', productOptions)
      // productOptions[0].componentPayload = update(productOptions[0].componentPayload, { $push: payload })
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!! ', productOptions[0].componentPayload)
      console.log('UPDATING PRODUCT OPTIONS ==========')

      collectionDispatch({ type: 'UPDATE_PRODUCTS', payload: payload })
   }

   useEffect(() => {
      console.log('isFirstRender', isFirstRender)

      if (isFirstRender.current) {
         console.log('INITIALLY SETTING PRODUCT OPTIONS ==========', collectionState.productOptions)
         isFirstRender.current = false
      } else {
         console.log('NOT SETTING PRODUCT OPTIONS ==========')
         return
      }
      // console.log('Updated the collection products', collectionState.products)

      collectionDispatch({
         type: 'SET_PRODUCT_OPTIONS',
         payload: [
            {
               componentPayload: collectionState.productOptions[0] ? collectionState.productOptions[0].componentPayload : collectionState.products,
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
      })
   }, [])

   return usePortal(
      <Items options={collectionState.productOptions}>
         <Products miscDispatch={updateCollectionProducts} />
      </Items>,
      findPortalElement(itemsState.element, itemsState.componentOptions.dropzoneCollectionProducts)
   )
}

export { CollectionProducts }
