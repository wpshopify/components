/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  graphQuery,
  findLastCursorId,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';
import { useItemsDispatch } from '../../../items/_state/hooks';
import { usePortal } from '../../../../common/hooks';
import to from 'await-to-js';

function PaginationPageSize({ isLoading, payloadSettings, queryParams, dataType }) {
  const { useState } = wp.element;
  const itemsDispatch = useItemsDispatch();

  const [pageSize, setPageSize] = useState(() => defaultPageSize());

  function defaultPageSize() {
    if (queryParams.first < 10) {
      return 'DEFAULT';
    }

    return queryParams.first;
  }

  function updatedFirstQueryParams(event) {
    return {
      first: parseInt(event.target.value),
    };
  }

  function setLoadingStates(isLoading) {
    itemsDispatch({ type: 'SET_IS_LOADING', payload: isLoading });
  }

  function setAfterCursorQueryParams(params) {
    itemsDispatch({ type: 'MERGE_QUERY_PARAMS', payload: params });
  }

  async function onChange(event) {
    setPageSize(event.target.value);

    let updatedParams = updatedFirstQueryParams(event);

    setAfterCursorQueryParams(updatedParams);

    setLoadingStates(true);

    // Calls Shopify
    const [shopifyError, shopifyResponse] = await to(graphQuery(dataType, updatedParams));

    if (shopifyError) {
      itemsDispatch({
        type: 'UPDATE_NOTICES',
        payload: { type: 'error', message: shopifyError },
      });
      itemsDispatch({ type: 'SET_IS_LOADING', payload: false });
      return;
    }

    var cursorId = findLastCursorId(shopifyResponse, dataType);

    if (cursorId) {
      setAfterCursorQueryParams(cursorId);
    }

    itemsDispatch({
      type: 'UPDATE_TOTAL_SHOWN',
      payload: shopifyResponse.model.products.length,
    });

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: shopifyResponse.model.products,
        skipCache: true,
        replace: true,
      },
    });

    itemsDispatch({ type: 'SET_IS_LOADING', payload: false });
  }

  const sortingSelectorCSS = css`
    width: 100%;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  `;

  return usePortal(
    <>
      {payloadSettings.paginationPageSize ? (
        <div className='wps-component wps-component-sorting' aria-label='Storefront Sorting'>
          <label className='wps-sorting-heading wps-mr-2' htmlFor='wps-sorting'>
            {wp.i18n.__('Page size:', 'wpshopify')}
          </label>

          <select
            css={sortingSelectorCSS}
            className='wps-input'
            value={pageSize}
            id='wps-sorting'
            onChange={onChange}
            disabled={isLoading}>
            <option value='DEFAULT' disabled='disabled'>
              {wp.i18n.__('Choose a size', 'wpshopify')}
            </option>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='250'>250</option>
          </select>
        </div>
      ) : null}
    </>,
    document.querySelector(payloadSettings.dropzonePageSize)
  );
}

export { PaginationPageSize };
