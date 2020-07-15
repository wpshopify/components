/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../common/utils'

function SearchButton() {
  const SearchButtonCSS = css`
    border: none;
    background: #ddd;
    padding: 0 2em;
    font-size: 0.9em;
    margin: 0 0 0 0;
    outline: 1px solid #ddd;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background: #c5c5c5;
    }
  `

  return (
    <button className='wps-search-submit' css={SearchButtonCSS}>
      <FilterHook name='search.button.text'>{wp.i18n.__('Search', 'wpshopify')}</FilterHook>
    </button>
  )
}

export default SearchButton
