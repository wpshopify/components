import React, { useContext } from 'react'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { fetchNextItems } from '../../../items/wrapper'

function PaginationLoadMore() {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)

   function onNextPage() {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })
      console.log('PaginationLoadMore itemsState.queryParams', itemsState.queryParams)

      fetchNextItems(itemsState, itemsDispatch)
   }

   return usePortal(
      <>
         {itemsState.hasMoreItems && (
            <button type='button' disabled={itemsState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {itemsState.isLoading ? 'Loading ⌛️' : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
