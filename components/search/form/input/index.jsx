import { SearchContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { useDebounce } from 'use-debounce'
import { Loader } from '../../../loader'

const { useEffect, useContext, useRef, useState } = wp.element

/*

Component: SearchInput

*/
function SearchInput() {
  const [localTerm, setLocalTerm] = useState('')
  const [searchState, searchDispatch] = useContext(SearchContext)
  const [itemsState] = useContext(ItemsContext)
  const [debouncedSearchTerm] = useDebounce(localTerm, 250)
  const isFirstRender = useRef(true)

  function setSearchTerm(value) {
    setLocalTerm(value)
  }

  /*
   
   This changes every 300ms when typing
   
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    searchDispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearchTerm })
  }, [debouncedSearchTerm])

  return (
    <div className='wps-search-input-wrapper'>
      <input
        type='search'
        id='wps-search-input'
        className='wps-search-input'
        name='search'
        val={localTerm}
        placeholder='Search the store'
        aria-label='Search store'
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Loader
        isLoading={itemsState.isLoading}
        dropzone={itemsState.payloadSettings.dropzoneLoader}
        color='#ddd'
      />
    </div>
  )
}

export { SearchInput }
