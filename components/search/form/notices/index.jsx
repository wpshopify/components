import { SearchContext } from '../../_state/context'

const { useContext } = wp.element

function SearchNotices({ isLoading }) {
  const [searchState] = useContext(SearchContext)

  return <div className='is-loading'>{searchState.isLoading ? 'Loading ⌛️' : ''}</div>
}

export { SearchNotices }
