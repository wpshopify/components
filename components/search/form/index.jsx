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
    max-width: ${wp.hooks.applyFilters('misc.layout.containerWidth', '1100px')};
    margin: 0 auto;

    .is-loading {
      position: absolute;
      bottom: -30px;
      font-size: 19px;
    }

    .components-notice {
      margin: 0;
      width: 100%;
    }
  `

  const searchInputWrapperCSS = css`
    display: flex;
    margin-bottom: 2em;
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

  function onSubmit(e) {
    e.preventDefault()
  }

  return usePortal(
    <form role='search' className='wps-search-form' css={searchWrapperCSS} onSubmit={onSubmit}>
      <SearchNotices />

      <div className='wps-search-wrapper' css={searchInputWrapperCSS}>
        <SearchInput isLoading={isLoading} payloadSettings={payloadSettings} />
      </div>
    </form>,
    document.querySelector(searchState.payloadSettings.dropzoneForm)
  )
}

export default wp.element.memo(SearchForm)
