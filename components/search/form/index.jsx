/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { queryBuilder } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { SearchContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { usePortal } from '../../../common/hooks'
import { SearchInput } from './input'
import { SearchNotices } from './notices'

function SearchForm({ isLoading, payloadSettings }) {
  const { useEffect, useContext, useRef } = wp.element
  const [, itemsDispatch] = useContext(ItemsContext)
  const [searchState] = useContext(SearchContext)
  const isFirstRender = useRef(true)

  const searchWrapperCSS = css`
    max-width: 775px;
    margin: 0 auto;
  `

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    itemsDispatch({
      type: 'MERGE_QUERY_PARAMS',
      payload: {
        query: queryBuilder({
          filter: payloadSettings.sortBy,
          phrase: wpshopify.settings.general.searchExactMatch,
          value: searchState.searchTerm,
        }),
      },
    })
  }, [searchState.searchTerm])

  return usePortal(
    <form role='search' className='wps-search-form' css={searchWrapperCSS}>
      <SearchNotices />

      <div className='wps-search-wrapper'>
        <SearchInput isLoading={isLoading} payloadSettings={payloadSettings} />
      </div>
    </form>,
    document.querySelector(searchState.payloadSettings.dropzoneForm)
  )
}

export default wp.element.memo(SearchForm)
