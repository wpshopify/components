/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { PaginationContext } from '../_state/context';
import PaginationControls from '../controls';
import { fetchNextItems } from '../../items/item/api';

function PaginationControlsWrapper({ itemsState, itemsDispatch }) {
  const { useContext } = wp.element;
  const [paginationState, paginationDispatch] = useContext(PaginationContext);

  function onNextPage() {
    if (!itemsState.isLoading) {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true });
      fetchNextItems(itemsState, itemsDispatch);
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
