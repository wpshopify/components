import { usePortal } from '../../../../common/hooks'
import { FilterHook } from '../../../../common/utils'
import { buttonCSS } from '../../../../common/css'
import { Loader } from '../../../loader'
import { InView } from 'react-intersection-observer'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function PaginationLoadMore({ isLoading, hasMoreItems, payloadSettings, onNextPage }) {
  function onViewChange(inView, entry) {
    if (!payloadSettings.infiniteScroll) {
      return
    }

    if (inView) {
      onNextPage()
    }
  }

  const loadMoreButtonCSS = css`
    max-width: 150px;
  `

  return usePortal(
    hasMoreItems && (
      <InView rootMargin='10px 0px 0px 0px' as='div' onChange={onViewChange}>
        <button
          css={[buttonCSS, loadMoreButtonCSS]}
          type='button'
          disabled={isLoading}
          className={'wps-btn-next-page'}
          onClick={onNextPage}>
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <FilterHook name='pagination.loadMore.text'>
              {wp.i18n.__('Load more', 'wpshopify')}
            </FilterHook>
          )}
        </button>
      </InView>
    ),
    document.querySelector(payloadSettings.dropzoneLoadMore)
  )
}

export default wp.element.memo(PaginationLoadMore)
