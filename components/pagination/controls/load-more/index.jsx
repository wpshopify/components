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
      console.log('hiiiiii')

      if (!itemsState.componentOptions.infiniteScroll) {
         console.log('dissaaaaabled, cleaning up')

         return () => (inView = false)
      }
      console.log('inView: ', inView)

      if (inView) {
         onNextPage()
      }
   }, [inView])

   return usePortal(
      <>
         {itemsState.hasMoreItems && !isEmpty(itemsState.payload) && (
            <button type='button' disabled={itemsState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {itemsState.isLoading ? 'Loading ⌛️' : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
