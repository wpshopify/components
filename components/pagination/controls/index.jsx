/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { PaginationPageSize } from './page-size';
import PaginationLoadMore from './load-more';
import { containerFluidCSS } from '../../../common/css';

function PaginationControls({
  payloadSettings,
  isLoading,
  hasMoreItems,
  onNextPage,
  queryParams,
  dataType,
}) {
  const paginationControlsCSS = css`
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;
    display: block;
  `;

  return (
    <section className='wps-pagination-controls' css={[containerFluidCSS, paginationControlsCSS]}>
      <PaginationPageSize
        dataType={dataType}
        queryParams={queryParams}
        payloadSettings={payloadSettings}
        isLoading={isLoading}
      />
      <PaginationLoadMore
        payloadSettings={payloadSettings}
        isLoading={isLoading}
        hasMoreItems={hasMoreItems}
        onNextPage={onNextPage}
      />
    </section>
  );
}

export default wp.element.memo(PaginationControls);
