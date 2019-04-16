import React, { useContext, useEffect, useReducer } from 'react'
import { getFilterData } from '@wpshopify/api'
import { usePortal } from '../../../common/hooks'
import { FiltersContext } from '../_state/context'
import { FilterOptionsGroup } from './group'
import { FilterHeading } from '../heading'
import { getFiltersOptionsInitialState } from './_state/initial-state'
import { FiltersOptionsReducer } from './_state/reducer'
import { FiltersOptionsContext } from './_state/context'

import to from 'await-to-js'
import assign from 'lodash/assign'

function combineFilterOptions(accumulator, currentValue) {
   return assign(accumulator, currentValue)
}

function formatFilterOptions(data) {
   return data.reduce(combineFilterOptions)
}

function getDataFromResponse(response) {
   return response.map(item => item.data)
}

/*

<FilterOptions>

*/
function FilterOptions() {
   const [state, dispatch] = useReducer(FiltersOptionsReducer, getFiltersOptionsInitialState())
   const { filtersState } = useContext(FiltersContext)
   const componentOptions = filtersState.componentOptions

   async function getAllFilterOptions() {
      var [respError, respData] = await to(getFilterData())

      const allFilteredData = formatFilterOptions(getDataFromResponse(respData))

      dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
      dispatch({ type: 'SET_FILTER_OPTIONS', payload: allFilteredData })
   }

   // On component initial render
   useEffect(() => {
      getAllFilterOptions()
   }, [])

   return usePortal(
      <FiltersOptionsContext.Provider
         value={{
            filtersOptionsState: state,
            filtersOptionsDispatch: dispatch
         }}>
         <>
            {componentOptions.showHeading ? <FilterHeading /> : ''}
            <aside className='wps-filters'>
               {componentOptions.showTags ? <FilterOptionsGroup groupType='tags' /> : ''}
               {componentOptions.showVendors ? <FilterOptionsGroup groupType='vendors' displayStyle='checkbox' /> : ''}
               {componentOptions.showTypes ? <FilterOptionsGroup groupType='types' displayStyle='checkbox' /> : ''}
            </aside>
         </>
      </FiltersOptionsContext.Provider>,
      document.querySelector(componentOptions.dropzoneOptions)
   )
}

export { FilterOptions }
