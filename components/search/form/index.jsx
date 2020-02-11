import { queryBuilder } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { SearchContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { ShopContext } from '../../shop/_state/context'

import { usePortal } from '../../../common/hooks'
import { SearchInput } from './input'
import { SearchButton } from './button'
import { SearchNotices } from './notices'

const { useEffect, useContext, useRef } = wp.element

function SearchForm() {
  const [shopState] = useContext(ShopContext)
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const [searchState, searchDispatch] = useContext(SearchContext)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    var hi = queryBuilder({
      filter: itemsState.componentOptions.sortBy,
      phrase: shopState.settings.general.searchExactMatch,
      value: searchState.searchTerm
    })

    itemsDispatch({
      type: 'SET_QUERY_PARAMS',
      payload: {
        query: hi
      }
    })
  }, [searchState.searchTerm])

  return usePortal(
    <form role='search' className='wps-search-form'>
      <SearchNotices />

      <div className='wps-search-wrapper'>
        <SearchInput />
        <SearchButton />
      </div>
    </form>,
    document.querySelector(searchState.componentOptions.dropzoneForm)
  )
}

export { SearchForm }
