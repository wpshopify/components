import { FilterHook } from '../../../../common/utils'

function SearchButton() {
  return (
    <button className='wps-search-submit'>
      <FilterHook name='search.button.text'>{wp.i18n.__('Search', 'wpshopify')}</FilterHook>
    </button>
  )
}

export { SearchButton }
