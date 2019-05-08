import React, { useContext } from 'react'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { fetchNextItems } from '../../../items/wrapper'
import isEmpty from 'lodash/isEmpty'

function PaginationLoadMore() {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)

   function onNextPage() {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })

      fetchNextItems(itemsState, itemsDispatch)
   }

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
