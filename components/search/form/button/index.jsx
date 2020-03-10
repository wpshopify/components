import { FilterHook } from '../../../../common/utils'

const { __ } = wp.i18n

function SearchButton() {
  return (
    <button className='wps-search-submit'>
      <FilterHook name='search.button.text'>{__('Search', wpshopify.misc.textdomain)}</FilterHook>
    </button>
  )
}

export { SearchButton }
