/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SearchContext } from '../../_state/context'
import { useDebounce } from 'use-debounce'

function SearchInput({ isLoading, payloadSettings }) {
  const { useEffect, useContext, useRef, useState } = wp.element
  const { Spinner } = wp.components
  const [localTerm, setLocalTerm] = useState(() => '')
  const [, searchDispatch] = useContext(SearchContext)
  const [debouncedSearchTerm] = useDebounce(localTerm, 350)
  const isFirstRender = useRef(true)

  function setSearchTerm(value) {
    setLocalTerm(value)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    searchDispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearchTerm })
  }, [debouncedSearchTerm])

  const spinnerCSS = css`
    position: absolute;
    top: 11px;
    right: 10px;
  `

  const searchInputCSS = css`
    padding: 1em;
    font-size: 1em;
    border: none;
    border: 1px solid #ddd;
    outline: none;
    width: 100%;

    &::-webkit-search-cancel-button {
      display: ${isLoading ? 'none' : 'block'};
      &:hover {
        cursor: pointer;
      }
    }
  `
  const searchInputWrapperCSS = css`
    width: 100%;
  `

  return (
    <div className='wps-search-input-wrapper' css={searchInputWrapperCSS}>
      <input
        type='search'
        id='wps-search-input'
        className='wps-search-input'
        name='search'
        val={localTerm}
        placeholder={wp.hooks.applyFilters(
          'search.placeholder.text',
          wp.i18n.__('Search the store', 'wpshopify')
        )}
        aria-label={wp.hooks.applyFilters(
          'search.placeholder.text',
          wp.i18n.__('Search the store', 'wpshopify')
        )}
        css={searchInputCSS}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && (
        <div css={spinnerCSS}>
          <Spinner />
        </div>
      )}
    </div>
  )
}

export { SearchInput }
