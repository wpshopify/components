import React, { useContext, useEffect } from 'react'
import to from 'await-to-js'
import assign from 'lodash/assign'
import { usePortal } from '../../../../common/hooks'
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { FiltersContext } from '../../_state/context'
import { FilterOptionsGroup } from '../group'
import { FilterOptionsHeading } from '../heading'
import { FiltersOptionsContext } from '../_state/context'

function combineFilterOptions(accumulator, currentValue) {
   return assign(accumulator, currentValue)
}

function formatFilterOptions(data) {
   return data.reduce(combineFilterOptions)
}

function getDataFromResponse(response) {
   return response.map(item => item.data)
}

function FiltersOptionsWrapper() {
   const [filtersOptionsState, filtersOptionsDispatch] = useContext(FiltersOptionsContext)
   const [filtersState, filtersDispatch] = useContext(FiltersContext)

   async function getAllFilterOptions() {
      var [respError, respData] = await to(getFilterData())

      const allFilteredData = formatFilterOptions(getDataFromResponse(respData))

      filtersOptionsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
      filtersOptionsDispatch({ type: 'SET_FILTER_OPTIONS', payload: allFilteredData })
   }

   // On component initial render
   useEffect(() => {
      getAllFilterOptions()
   }, [])

   return usePortal(
      <>
         {filtersState.componentOptions.showOptionsHeading ? <FilterOptionsHeading /> : ''}
         <aside className='wps-filters'>
            {filtersState.componentOptions.showTags ? <FilterOptionsGroup groupType='tags' /> : ''}
            {filtersState.componentOptions.showVendors ? <FilterOptionsGroup groupType='vendors' displayStyle='checkbox' /> : ''}
            {filtersState.componentOptions.showTypes ? <FilterOptionsGroup groupType='types' displayStyle='checkbox' /> : ''}
         </aside>
      </>,
      document.querySelector(filtersState.componentOptions.dropzoneOptions)
   )
}

export { FiltersOptionsWrapper }
