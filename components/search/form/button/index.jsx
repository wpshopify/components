const { __ } = wp.i18n

function SearchButton() {
  return (
    <button className='wps-search-submit'>
      {wp.hooks.applyFilters('search.button.text', __('Search', wpshopify.misc.textdomain))}
    </button>
  )
}

export { SearchButton }
