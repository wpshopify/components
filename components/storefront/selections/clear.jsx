import { StorefrontContext } from '../_state/context'

const { useContext } = wp.element
const { __ } = wp.i18n

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
      {wp.hooks.applyFilters(
        'storefront.selections.clear.text',
        __('Clear all', wpshopify.misc.textdomain)
      )}
    </div>
  )
}

export { StorefrontSelectionsClear }
