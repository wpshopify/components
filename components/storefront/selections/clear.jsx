import { StorefrontContext } from '../_state/context'
import { FilterHook, __t } from '../../../common/utils'

const { useContext } = wp.element

function StorefrontSelectionsClear() {
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

  function clearAllSelections() {
    storefrontDispatch({ type: 'CLEAR_SELECTIONS' })
    storefrontDispatch({ type: 'CLEAR_SELECTED_VENDORS' })
    storefrontDispatch({ type: 'CLEAR_SELECTED_TAGS' })
    storefrontDispatch({ type: 'CLEAR_SELECTED_TYPES' })
  }

  return (
    <div className='wps-filter-selections-clear' onClick={clearAllSelections}>
      <FilterHook name='storefront.selections.clear.text'>{__t('Clear all')}</FilterHook>
    </div>
  )
}

export { StorefrontSelectionsClear }
