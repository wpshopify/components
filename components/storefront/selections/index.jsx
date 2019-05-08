import React, { useContext, useEffect, useRef } from 'react'
import { StorefrontContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'

import { StorefrontSelectionsWrapper } from './wrapper'
import { objectIsEmpty } from '../../../common/utils'
import { usePortal } from '../../../common/hooks'

import isEmpty from 'lodash/isEmpty'
import mapKeys from 'lodash/mapKeys'
import compact from 'lodash/compact'

function StorefrontSelections() {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   const isFirstRender = useRef(true)

   function joinFilteredValues(value) {
      if (isEmpty(value)) {
         return ''
      }

      return value.join(' ')
   }

   function stringifyFilterTypes(filterTypes) {
      if (!filterTypes) {
         return ''
      }

      var joinedTypes = filterTypes.map(joinFilteredValues)

      if (isEmpty(joinedTypes)) {
         return ''
      }

      return joinedTypes.join(' ')
   }

   /*

Annoying, but needs to be done to make the filter components easier to deal with

*/
   function normalizeKeysForShopifyQuery(selections) {
      return mapKeys(selections, function(value, key) {
         if (key === 'tags') {
            return 'tag'
         }

         if (key === 'vendors') {
            return 'vendor'
         }

         if (key === 'types') {
            return 'product_type'
         }
      })
   }

   function combineFilterTypes(selections, filterTypes) {
      return compact(
         filterTypes.map((filterType, index) => {
            if (isEmpty(selections[filterType])) {
               return
            }

            return selections[filterType].map(value => filterType + ':' + value)
         })
      )
   }

   function buildQueryStringFromSelections(selections) {
      if (isEmpty(selections)) {
         return '*'
      }

      const normalizedSelects = normalizeKeysForShopifyQuery(selections)

      let newQuery = stringifyFilterTypes(combineFilterTypes(normalizedSelects, Object.keys(normalizedSelects)))

      if (newQuery === '') {
         newQuery = '*'
      }

      return newQuery
   }

   function updateFetchParamsQuery() {
      return {
         query: buildQueryStringFromSelections(storefrontState.selections)
      }
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      itemsDispatch({ type: 'SET_QUERY_PARAMS', payload: updateFetchParamsQuery() })
   }, [storefrontState.selections])

   return usePortal(!objectIsEmpty(storefrontState.selections) ? <StorefrontSelectionsWrapper /> : '', document.querySelector(itemsState.componentOptions.dropzoneSelections))
}

export { StorefrontSelections }
