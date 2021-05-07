import PaginationControlsWrapper from './controls-wrapper';
import PaginationItems from './items';
import { PaginationProvider } from './_state/provider';
import { useItemsState, useItemsDispatch } from '../items/_state/hooks';

function Pagination({ children }) {
  const itemsState = useItemsState();
  const itemsDispatch = useItemsDispatch();

  return (
    <PaginationProvider
      payloadSettings={itemsState.payloadSettings}
      hasMoreItems={itemsState.hasMoreItems}>
      <PaginationItems
        payload={itemsState.payload}
        payloadSettings={itemsState.payloadSettings}
        componentId={itemsState.componentId}>
        {children}
      </PaginationItems>
      <PaginationControlsWrapper itemsState={itemsState} itemsDispatch={itemsDispatch} />
    </PaginationProvider>
  );
}

export default Pagination;
