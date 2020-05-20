import { SearchContext } from '../../_state/context'

const { useContext } = wp.element

function SearchNotices() {
  const [searchState] = useContext(SearchContext)

  return (
    <div className='is-loading'>
      {searchState.isLoading ? wp.i18n.__('Loading ...', 'wpshopify') : ''}
    </div>
  )
}

export { SearchNotices }
