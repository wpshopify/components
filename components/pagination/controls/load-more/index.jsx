import React, { useContext, useEffect, useRef } from 'react'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal, useInView } from '../../../../common/hooks'
import { fetchNextItems } from '../../../items/wrapper'
import { Loader } from '../../../loader'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import uniqid from 'uniqid'

function PaginationLoadMore({ miscDispatch }) {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const randomClass = uniqid('wps-btn-')
   const loadMoreButtonSelector = '.' + randomClass
   var [inView] = useInView(loadMoreButtonSelector, itemsState)
   const isFirstRender = useRef(true)

   function onNextPage() {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })

      fetchNextItems(itemsState, itemsDispatch, miscDispatch)
   }

   useEffect(() => {
      if (!WP_Shopify.misc.isPro) {
         return
      }
      if (!itemsState.componentOptions.infiniteScroll) {
         return () => (inView = false)
      }

      if (inView) {
         onNextPage()
      }
   }, [inView])

   function shouldShowLoadMore() {
      if (isFirstRender.current) {
         isFirstRender.current = false

         if (has(itemsState.componentOptions, 'paginationHideInitial') && itemsState.componentOptions.paginationHideInitial) {
            return false
         }
      }

      // If total shown matches the limit
      if (itemsState.totalShown === itemsState.limit) {
         return false
      }

      if (!itemsState.componentOptions.paginationLoadMore) {
         return false
      }

      if (itemsState.hasMoreItems && !isEmpty(itemsState.payload)) {
         return true
      } else {
         return false
      }
   }

   return usePortal(
      <>
         {shouldShowLoadMore() && (
            <button type='button' disabled={itemsState.isLoading} className={'wps-btn wps-btn-secondary wps-btn-next-page ' + randomClass} onClick={onNextPage}>
               {itemsState.isLoading ? <Loader isLoading={itemsState.isLoading} /> : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
