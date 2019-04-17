import React, { useEffect, useReducer, useRef } from 'react'
import { queryProducts, fetchByQueryParams } from '@wpshopify/api'

import { FilterSelections } from './selections'
import { FilterDropzone } from './dropzone'
import { FilterOptions } from './options'
import { FilterSorting } from './sorting'
import { FilterPagination } from './pagination'

import { checkHasResults, checkPrevPage, checkNextPage } from '../../common/pagination'

import { getFiltersInitialState } from './_state/initial-state'
import { FiltersReducer } from './_state/reducer'
import { FiltersContext } from './_state/context'

import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import mapKeys from 'lodash/mapKeys'

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

function Filters({ options }) {
   const [state, dispatch] = useReducer(FiltersReducer, getFiltersInitialState(options))

   const isFirstRender = useRef(true)

   function fetchProducts() {
      return queryProducts(fetchByQueryParams(state.filterParams))
   }

   function updateFetchParamsQuery() {
      return {
         query: buildQueryStringFromSelections(state.selections)
      }
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      dispatch({ type: 'SET_FILTER_PARAMS', payload: updateFetchParamsQuery() })
   }, [state.selections])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      loadData()
   }, [state.filterParams])

   function afterDataLoads(items) {
      dispatch({ type: 'SET_HAS_RESULTS', payload: checkHasResults(items) })
      dispatch({ type: 'SET_HAS_NEXT_PAGE', payload: checkNextPage(items) })
      dispatch({ type: 'SET_HAS_PREV_PAGE', payload: checkPrevPage(items) })
      dispatch({ type: 'SET_PAYLOAD', payload: items })
      dispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   function beforeDataLoads() {
      dispatch({ type: 'SET_IS_LOADING', payload: true })
   }

   async function loadData() {
      beforeDataLoads()

      var [itemsError, items] = await to(fetchProducts())

      afterDataLoads(items)
   }

   return (
      <>
         <FiltersContext.Provider
            value={{
               filtersState: state,
               filtersDispatch: dispatch
            }}>
            {state.componentOptions.dropzoneSelections ? <FilterSelections /> : ''}
            {state.componentOptions.dropzoneSorting ? <FilterSorting /> : ''}
            {state.componentOptions.dropzonePagination ? <FilterPagination /> : ''}

            <FilterOptions />
            <FilterDropzone />
         </FiltersContext.Provider>
      </>
   )
}

export { Filters, FiltersContext }
