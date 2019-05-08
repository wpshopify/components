import React, { useContext, useEffect } from 'react'
import to from 'await-to-js'
import assign from 'lodash/assign'
import { usePortal } from '../../../../common/hooks'
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { StorefrontContext } from '../../_state/context'
import { StorefrontFilterOptionsGroup } from '../group'
import { StorefrontFilterOptionsHeading } from '../heading'
import { StorefrontOptionsContext } from '../_state/context'

function combineFilterOptions(accumulator, currentValue) {
   return assign(accumulator, currentValue)
}

function formatFilterOptions(data) {
   return data.reduce(combineFilterOptions)
}

function getDataFromResponse(response) {
   return response.map(item => item.data)
}

function StorefrontOptionsWrapper() {
   const [storefrontOptionsState, storefrontOptionsDispatch] = useContext(StorefrontOptionsContext)
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   async function getAllFilterOptions() {
      var [respError, respData] = await to(getFilterData())

      const allFilteredData = formatFilterOptions(getDataFromResponse(respData))

      storefrontOptionsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
      storefrontOptionsDispatch({ type: 'SET_FILTER_OPTIONS', payload: allFilteredData })
   }

   // On component initial render
   useEffect(() => {
      getAllFilterOptions()
   }, [])

   return usePortal(
      <>
         {storefrontState.componentOptions.showOptionsHeading ? <StorefrontFilterOptionsHeading /> : ''}
         <aside className='wps-storefront'>
            {storefrontState.componentOptions.showTags ? <StorefrontFilterOptionsGroup groupType='tags' /> : ''}
            {storefrontState.componentOptions.showVendors ? <StorefrontFilterOptionsGroup groupType='vendors' displayStyle='checkbox' /> : ''}
            {storefrontState.componentOptions.showTypes ? <StorefrontFilterOptionsGroup groupType='types' displayStyle='checkbox' /> : ''}
         </aside>
      </>,
      document.querySelector(storefrontState.componentOptions.dropzoneOptions)
   )
}

export { StorefrontOptionsWrapper }
