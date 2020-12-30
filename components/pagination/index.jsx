import PaginationControlsWrapper from './controls-wrapper';
import PaginationItems from './items';
import { PaginationProvider } from './_state/provider';
import { ItemsContext } from '../items/_state/context';

function Pagination({ children }) {
  const { useContext } = wp.element;
  const [itemsState, itemsDispatch] = useContext(ItemsContext);

  return (
    <PaginationProvider
      payloadSettings={itemsState.payloadSettings}
      hasMoreItems={itemsState.hasMoreItems}>
      <PaginationItems payload={itemsState.payload} payloadSettings={itemsState.payloadSettings}>
        {children}
      </PaginationItems>
      <PaginationControlsWrapper itemsState={itemsState} itemsDispatch={itemsDispatch} />
    </PaginationProvider>
  );
}

export default Pagination;
