import React, { useContext, useEffect } from 'react'
import to from 'await-to-js'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'
import { usePortal } from '../../../../common/hooks'
import { hasHooks } from '../../../../common/utils'
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { StorefrontContext } from '../../_state/context'
import { StorefrontFilterOptionsGroup } from '../group'
import { StorefrontFilterOptionsHeading } from '../heading'
import { StorefrontOptionsContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'

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

function optionsErrorMessage() {
   return '. Occurred when fetching available filter options. Please clear your browser cache and reload the page.'
}

function StorefrontOptionsWrapper() {
   const [storefrontOptionsState, storefrontOptionsDispatch] = useContext(StorefrontOptionsContext)
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)
   const [itemsState, itemsDispatch] = useContext(ItemsContext)

   async function getAllFilterOptions() {
      var [respError, respData] = await to(getFilterData())

      if (respError) {
         itemsDispatch({ type: 'UPDATE_NOTICES', payload: { type: 'error', message: respError.message + optionsErrorMessage() } })
      } else {
         const allFilteredData = formatFilterOptions(getDataFromResponse(respData))

         storefrontOptionsDispatch({ type: 'SET_FILTER_OPTIONS', payload: lowercaseFilterOptions(allFilteredData) })
      }

      storefrontOptionsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
   }

   // On component initial render
   useEffect(() => {
      getAllFilterOptions()
   }, [])

   function getTagsHeading() {
      return hasHooks() ? wp.hooks.applyFilters('default.storefront.tags.heading', 'Tags') : 'Tags'
   }

   function getVendorsHeading() {
      return hasHooks() ? wp.hooks.applyFilters('default.storefront.vendors.heading', 'Vendors') : 'Vendors'
   }

   function getTypesHeading() {
      return hasHooks() ? wp.hooks.applyFilters('default.storefront.types.heading', 'Types') : 'Types'
   }

   return usePortal(
      <>
         {storefrontState.componentOptions.showOptionsHeading ? <StorefrontFilterOptionsHeading /> : ''}
         <aside className='wps-storefront'>
            {storefrontState.componentOptions.showTags ? <StorefrontFilterOptionsGroup heading={getTagsHeading()} groupType='tags' /> : ''}
            {storefrontState.componentOptions.showVendors ? <StorefrontFilterOptionsGroup heading={getVendorsHeading()} groupType='vendors' displayStyle='checkbox' /> : ''}
            {storefrontState.componentOptions.showTypes ? <StorefrontFilterOptionsGroup heading={getTypesHeading()} groupType='types' displayStyle='checkbox' /> : ''}
         </aside>
      </>,
      document.querySelector(storefrontState.componentOptions.dropzoneOptions)
   )
}

export { StorefrontOptionsWrapper }
