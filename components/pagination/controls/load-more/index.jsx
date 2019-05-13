import React, { useContext, useEffect } from 'react'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal, useInView } from '../../../../common/hooks'
import { fetchNextItems } from '../../../items/wrapper'
import isEmpty from 'lodash/isEmpty'

function PaginationLoadMore() {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [inView] = useInView('.wps-btn-next-page', itemsState)

   function onNextPage() {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })

      fetchNextItems(itemsState, itemsDispatch)
   }

   useEffect(() => {
      if (!itemsState.componentOptions.infiniteScroll) {
         return () => (inView = false)
      }

      if (inView) {
         onNextPage()
      }
   }, [inView])
   console.log('LOAD MORE ::::::::::', itemsState)

   function shouldShowLoadMore() {
      console.log('itemsState.componentOptions.paginationLoadMore', itemsState.componentOptions.paginationLoadMore)

      if (!itemsState.componentOptions.paginationLoadMore) {
         return false
      }
      console.log('itemsState.hasMoreItems', itemsState.hasMoreItems)
      console.log('itemsState.payload', itemsState.payload)

      if (itemsState.hasMoreItems && !isEmpty(itemsState.payload)) {
         return true
      } else {
         return false
      }
   }

   return usePortal(
      <>
         {shouldShowLoadMore() && (
            <button type='button' disabled={itemsState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {itemsState.isLoading ? 'Loading ⌛️' : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
