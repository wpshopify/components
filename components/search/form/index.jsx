import { queryBuilder } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { SearchContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'

import { usePortal } from '../../../common/hooks'
import { SearchInput } from './input'
import { SearchButton } from './button'
import { SearchNotices } from './notices'

const { useEffect, useContext, useRef } = wp.element

function SearchForm() {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const [searchState] = useContext(SearchContext)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    var hi = queryBuilder({
      filter: itemsState.payloadSettings.sortBy,
      phrase: wpshopify.settings.general.searchExactMatch,
      value: searchState.searchTerm,
    })

    itemsDispatch({
      type: 'MERGE_QUERY_PARAMS',
      payload: {
        query: hi,
      },
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
    document.querySelector(searchState.payloadSettings.dropzoneForm)
  )
}

export { SearchForm }
