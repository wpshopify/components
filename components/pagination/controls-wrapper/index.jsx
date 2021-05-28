/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import PaginationControls from '../controls';
import { useQuery } from 'react-query';
import { fetchNextItems } from '../../items/item/api';
import { isHidingPagination } from '../../../common/pagination';
import { useItemsState, useItemsDispatch } from '../../items/_state/hooks';

function PaginationControlsWrapper() {
  const itemsDispatch = useItemsDispatch();
  const itemsState = useItemsState();

  const fetchNextItemsQuery = useQuery(
    'items::next',
    () => {
      return fetchNextItems(itemsState, itemsDispatch);
    },
    {
      enabled: itemsState.isFetchingNext,
      onError: () => {
        itemsDispatch({
          type: 'SET_IS_FETCHING_NEXT',
          payload: false,
        });
      },
      onSuccess: () => {
        itemsDispatch({
          type: 'SET_IS_FETCHING_NEXT',
          payload: false,
        });
      },
    }
  );

  function onNextPage() {
    if (!itemsState.isLoading) {
      itemsDispatch({
        type: 'SET_IS_FETCHING_NEXT',
        payload: true,
      });
    }

    return false;
  }

  return !isHidingPagination(
    itemsState.payloadSettings,
    itemsState.hasMoreItems,
    itemsState.isModal
  ) ? (
    <PaginationControls
      queryParams={itemsState.queryParams}
      dataType={itemsState.dataType}
      isLoading={itemsState.isLoading}
      payloadSettings={itemsState.payloadSettings}
      hasMoreItems={itemsState.hasMoreItems}
      onNextPage={onNextPage}
    />
  ) : null;
}

export default PaginationControlsWrapper;
