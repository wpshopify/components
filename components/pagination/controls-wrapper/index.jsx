/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { PaginationContext } from '../_state/context';
import PaginationControls from '../controls';
import { fetchNextItems } from '../../items/item/api';
import { useQuery } from 'react-query';

function PaginationControlsWrapper({ itemsState, itemsDispatch }) {
  const { useContext } = wp.element;
  const [paginationState, paginationDispatch] = useContext(PaginationContext);

  const fetchNextItemsQuery = useQuery(
    'items::next',
    () => {
      return fetchNextItems(itemsState, itemsDispatch);
    },
    {
      enabled: itemsState.isFetchingNext,
      onError: () => {
        paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: false });
        itemsDispatch({
          type: 'SET_IS_FETCHING_NEXT',
          payload: false,
        });
      },
      onSuccess: () => {
        paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: false });
        itemsDispatch({
          type: 'SET_IS_FETCHING_NEXT',
          payload: false,
        });
      },
    }
  );

  function onNextPage() {
    if (!itemsState.isLoading) {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true });
      itemsDispatch({
        type: 'SET_IS_FETCHING_NEXT',
        payload: true,
      });
    }
  }

  return !paginationState.isHidingPagination ? (
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
