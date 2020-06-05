import { ItemsContext } from '../items/_state/context'
import { SearchProvider } from './_state/provider'
import SearchForm from './form'
import SearchItems from './form/items'

const { useContext } = wp.element

function Search() {
  const [itemsState] = useContext(ItemsContext)

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
  )
}

export { Search }
