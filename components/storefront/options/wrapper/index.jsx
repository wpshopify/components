import to from 'await-to-js'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'
import { usePortal } from '../../../../common/hooks'
import { FilterHook } from '../../../../common/utils'
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { StorefrontContext } from '../../_state/context'
import { StorefrontFilterOptionsGroup } from '../group'
import { StorefrontFilterOptionsHeading } from '../heading'
import { StorefrontOptionsContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'

const { useEffect, useContext } = wp.element

function combineFilterOptions(accumulator, currentValue) {
  return assign(accumulator, currentValue)
}

function formatFilterOptions(data) {
  return data.reduce(combineFilterOptions)
}

function getDataFromResponse(response) {
  return response.map(item => item.data)
}

function lowercaseFilterOptions(allFilteredData) {
  return mapValues(allFilteredData, value => {
    return map(value, val => val.toLowerCase())
  })
}

function StorefrontOptionsWrapper() {
  const [storefrontOptionsState, storefrontOptionsDispatch] = useContext(StorefrontOptionsContext)
  const [storefrontState] = useContext(StorefrontContext)
  const [itemsState, itemsDispatch] = useContext(ItemsContext)

  async function getAllFilterOptions() {
    var [respError, respData] = await to(getFilterData())

    if (respError) {
      itemsDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __(
            respError.message +
              '. Occurred when fetching available filter options. Please clear your browser cache and reload the page.',
            wpshopify.misc.textdomain
          )
        }
      })
    } else {
      const allFilteredData = formatFilterOptions(getDataFromResponse(respData))

      storefrontOptionsDispatch({
        type: 'SET_FILTER_OPTIONS',
        payload: lowercaseFilterOptions(allFilteredData)
      })
    }

    storefrontOptionsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
  }

  // On component initial render
  useEffect(() => {
    getAllFilterOptions()
  }, [])

  function TagsHeading() {
    return (
      <FilterHook name='default.storefront.tags.heading'>
        {__('Tags', wpshopify.misc.textdomain)}
      </FilterHook>
    )
  }

  function VendorsHeading() {
    return (
      <FilterHook name='default.storefront.vendors.heading'>
        {__('Vendors', wpshopify.misc.textdomain)}
      </FilterHook>
    )
  }

  function TypesHeading() {
    return (
      <FilterHook name='default.storefront.types.heading'>
        {__('Types', wpshopify.misc.textdomain)}
      </FilterHook>
    )
  }

  return usePortal(
    <>
      {storefrontState.payloadSettings.showOptionsHeading ? <StorefrontFilterOptionsHeading /> : ''}
      <aside className='wps-storefront'>
        {storefrontState.payloadSettings.showTags ? (
          <StorefrontFilterOptionsGroup heading={TagsHeading()} groupType='tags' />
        ) : (
          ''
        )}
        {storefrontState.payloadSettings.showVendors ? (
          <StorefrontFilterOptionsGroup
            heading={VendorsHeading()}
            groupType='vendors'
            displayStyle='checkbox'
          />
        ) : (
          ''
        )}
        {storefrontState.payloadSettings.showTypes ? (
          <StorefrontFilterOptionsGroup
            heading={TypesHeading()}
            groupType='types'
            displayStyle='checkbox'
          />
        ) : (
          ''
        )}
      </aside>
    </>,
    document.querySelector(storefrontState.payloadSettings.dropzoneOptions)
  )
}

export { StorefrontOptionsWrapper }
