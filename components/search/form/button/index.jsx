import { FilterHook, __t } from '../../../../common/utils'

function SearchButton() {
  return (
    <button className='wps-search-submit'>
      <FilterHook name='search.button.text'>{__t('Search')}</FilterHook>
    </button>
  )
}

export { SearchButton }
