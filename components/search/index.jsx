import { useItemsState } from '../items/_state/hooks';
import { SearchProvider } from './_state/provider';
import SearchForm from './form';
import SearchItems from './form/items';

function Search() {
  const itemsState = useItemsState();

  return (
    <SearchProvider options={itemsState}>
      <SearchForm isLoading={itemsState.isLoading} payloadSettings={itemsState.payloadSettings} />
      <SearchItems
        noResultsText={itemsState.noResultsText}
        queryParams={itemsState.queryParams}
        payload={itemsState.payload}
        payloadSettings={itemsState.payloadSettings}
      />
    </SearchProvider>
  );
}

export { Search };
