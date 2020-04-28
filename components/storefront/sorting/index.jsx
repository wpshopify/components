import { StorefrontContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { usePortal } from '../../../common/hooks'
import { FilterHook, __t } from '../../../common/utils'

const { useContext, useState } = wp.element

function getSelectedOption(select) {
  return select.options[select.selectedIndex]
}

function hasReverse(select) {
  var selectedOption = getSelectedOption(select)

  return selectedOption.hasAttribute('data-wps-reverse')
}

function StorefrontSorting() {
  const [storefrontState] = useContext(StorefrontContext)
  const [itemsState, itemsDispatch] = useContext(ItemsContext)

  const [sortValue, setSortValue] = useState(() => storefrontState.payloadSettings.sortBy)

  function updateFetchParams(event) {
    let reverse = false

    if (hasReverse(event.target)) {
      reverse = true
    }

    let sortKey = event.target.value

    if (sortKey.includes('-REVERSE')) {
      sortKey = sortKey.replace('-REVERSE', '')
    }

    return {
      reverse: reverse,
      sortKey: sortKey,
    }
  }

  function onChange(event) {
    setSortValue(event.target.value)

    itemsDispatch({
      type: 'MERGE_QUERY_PARAMS',
      payload: updateFetchParams(event),
    })
  }

  return usePortal(
    <div className='wps-component wps-component-sorting'>
      <label className='wps-sorting-heading wps-mr-2' htmlFor='wps-sorting'>
        <FilterHook name='storefront.sorting.label.text'>{__t('Sort by:')}</FilterHook>
      </label>

      <select
        value={sortValue}
        id='wps-sorting'
        onChange={onChange}
        disabled={itemsState.isLoading}>
        <option value='DEFAULT' disabled='disabled'>
          <FilterHook name='storefront.sorting.default.text'>{__t('Choose an option')}</FilterHook>
        </option>
        <option value='PRICE'>
          <FilterHook name='storefront.sorting.price.text'>{__t('Price (Low to high)')}</FilterHook>
        </option>
        <option value='PRICE-REVERSE' data-wps-reverse>
          <FilterHook name='storefront.sorting.priceReverse.text'>
            {__t('Price (High to low)')}
          </FilterHook>
        </option>
        <option value='CREATED_AT' data-wps-reverse>
          <FilterHook name='storefront.sorting.newArrival.text'>{__t('New Arrival')}</FilterHook>
        </option>
        <option value='BEST_SELLING'>
          <FilterHook name='storefront.sorting.bestSelling.text'>{__t('Best Selling')}</FilterHook>
        </option>
        <option value='TITLE'>
          <FilterHook name='storefront.sorting.title.text'>{__t('Title (A-Z)')}</FilterHook>
        </option>
        <option value='TITLE-REVERSE' data-wps-reverse>
          <FilterHook name='storefront.sorting.titleReverse.text'>{__t('Title (Z-A)')}</FilterHook>
        </option>
      </select>
    </div>,
    document.querySelector(storefrontState.payloadSettings.dropzoneSorting)
  )
}

export { StorefrontSorting }
