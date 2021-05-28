import { usePortal } from '../../../../common/hooks';
import { FilterHook } from '../../../../common/utils';
import { buttonCSS } from '../../../../common/css';
import { InView } from 'react-intersection-observer';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ '../../../loader')
);

function PaginationLoadMore({ isLoading, hasMoreItems, payloadSettings, onNextPage }) {
  function onViewChange(inView, entry) {
    if (!wpshopify.misc.isPro || !payloadSettings.infiniteScroll) {
      return;
    }

    if (inView && !isLoading) {
      onNextPage();
    }
  }

  const loadMoreButtonCSS = css`
    max-width: 150px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  `;

  return usePortal(
    hasMoreItems ? (
      <InView rootMargin='10px 0px 0px 0px' as='div' onChange={onViewChange}>
        <div
          css={[buttonCSS, loadMoreButtonCSS]}
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
        </div>
      </InView>
    ) : null,
    document.querySelector(payloadSettings.dropzoneLoadMore)
  );
}

export default wp.element.memo(PaginationLoadMore);
