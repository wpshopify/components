import { ItemsContext } from '../items/_state/context'
import { SearchForm } from './form'
import { SearchItems } from './form/items'
import { SearchProvider } from './_state/provider'

const { useContext } = wp.element

function Search() {
  const [itemsState] = useContext(ItemsContext)

  return (
    <SearchProvider options={itemsState}>
      <SearchForm />
      <SearchItems />
    </SearchProvider>
  )
}

export { Search }
