import React, { useContext, useEffect, useRef } from 'react'
import { FiltersContext } from '../_state/context'
import { FilterSelectionsWrapper } from './wrapper'
import { objectIsEmpty } from '../../../common/utils'
import { usePortal } from '../../../common/hooks'
import { getProductsFromQuery } from '@wpshopify/api'
import { checkHasResults, checkPrevPage, checkNextPage } from '../../../common/pagination'
import isEmpty from 'lodash/isEmpty'
import mapKeys from 'lodash/mapKeys'
import compact from 'lodash/compact'
import to from 'await-to-js'

function FilterSelections() {
   const [filtersState, filtersDispatch] = useContext(FiltersContext)

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
         query: buildQueryStringFromSelections(filtersState.selections)
      }
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      filtersDispatch({ type: 'SET_QUERY_PARAMS', payload: updateFetchParamsQuery() })
   }, [filtersState.selections])

   function fetchProducts() {
      return getProductsFromQuery(filtersState.queryParams)
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      loadData()
   }, [filtersState.queryParams])

   function afterDataLoads(items) {
      filtersDispatch({ type: 'SET_HAS_RESULTS', payload: checkHasResults(items) })
      filtersDispatch({ type: 'SET_HAS_NEXT_PAGE', payload: checkNextPage(items) })
      filtersDispatch({ type: 'SET_HAS_PREV_PAGE', payload: checkPrevPage(items) })
      filtersDispatch({ type: 'SET_PAYLOAD', payload: items })
      filtersDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   function beforeDataLoads() {
      filtersDispatch({ type: 'SET_IS_LOADING', payload: true })
   }

   async function loadData() {
      beforeDataLoads()

      console.log('FETCHING ...')

      var [itemsError, items] = await to(fetchProducts())

      console.log('itemsError ...', itemsError)
      console.log('DONE ... items', items)

      afterDataLoads(items)
   }

   return usePortal(!objectIsEmpty(filtersState.selections) ? <FilterSelectionsWrapper /> : '', document.querySelector(filtersState.componentOptions.dropzoneSelections))
}

export { FilterSelections }
