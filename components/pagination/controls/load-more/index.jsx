import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { FilterHook } from '../../../../common/utils'
import { fetchNextItems } from '../../../items/item/api'
import { Loader } from '../../../loader'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import { InView } from 'react-intersection-observer'

const { useContext, useRef } = wp.element
const { __ } = wp.i18n

function PaginationLoadMore() {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const [paginationState, paginationDispatch] = useContext(PaginationContext)
  const isFirstRender = useRef(true)

  function onNextPage() {
    paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })
    fetchNextItems(itemsState, itemsDispatch)
  }

  function shouldShowLoadMore() {
    //  return true
    if (isFirstRender.current) {
      isFirstRender.current = false

      if (
        has(itemsState.payloadSettings, 'paginationHideInitial') &&
        itemsState.payloadSettings.paginationHideInitial
      ) {
        return false
      }
    }

    // If total shown matches the limit
    if (itemsState.totalShown === itemsState.payloadSettings.limit) {
      return false
    }

    if (!itemsState.payloadSettings.paginationLoadMore) {
      return false
    }

    if (itemsState.hasMoreItems && !isEmpty(itemsState.payload)) {
      return true
    } else {
      return false
    }
  }

  function onViewChange(inView, entry) {
    if (!itemsState.payloadSettings.infiniteScroll) {
      return
    }

    if (inView) {
      onNextPage()
    }
  }

  return usePortal(
    <>
      {shouldShowLoadMore() && (
        <InView rootMargin='10px 0px 0px 0px' as='div' onChange={onViewChange}>
          <button
            type='button'
            disabled={itemsState.isLoading}
            className={'wps-btn wps-btn-secondary wps-btn-next-page'}
            onClick={onNextPage}>
            {itemsState.isLoading ? (
              <Loader isLoading={itemsState.isLoading} />
            ) : (
              <FilterHook name='pagination.loadMore.text'>
                {__('Load more', wpshopify.misc.textdomain)}
              </FilterHook>
            )}
          </button>
        </InView>
      )}
    </>,
    document.querySelector(paginationState.payloadSettings.dropzoneLoadMore)
  )
}

export default PaginationLoadMore
