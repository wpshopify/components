import React, { useEffect, useReducer, useRef } from 'react'
import { getFilterData, queryProducts, fetchByQueryParams } from '@wpshopify/api'

import { FilterSelections } from './selections'
import { FilterDropzone } from './dropzone'
import { FilterOptions } from './options'
import { FilterSorting } from './sorting'
import { FilterPagination } from './pagination'

import { checkHasResults, checkPrevPage, checkNextPage } from '../../common/pagination'

import { getFiltersInitialState } from './_state/initial-state'
import { FiltersReducer } from './_state/reducer'
import { FiltersContext } from './_state/context'

import assign from 'lodash/assign'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'

function combineFilterData(accumulator, currentValue) {
   return assign(accumulator, currentValue)
}

function formatFilterData(data) {
   return data.reduce(combineFilterData)
}

function getDataFromResponse(response) {
   return response.map(item => item.data)
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

function buildQueryStringFromSelections(selections) {
   if (isEmpty(selections)) {
      return
   }

   var keys = Object.keys(selections)

   return stringifyFilterTypes(combineFilterTypes(selections, keys))
}

function Filters({ options }) {
   const [state, dispatch] = useReducer(FiltersReducer, getFiltersInitialState(options))

   const isFirstRender = useRef(true)

   function fetchProducts() {
      console.log('state.filterParams', state.filterParams)

      return queryProducts(fetchByQueryParams(state.filterParams))
   }

   async function getAllFilterData() {
      console.log('Fetching filter data ...')

      var [respError, respData] = await to(getFilterData())

      var allFilteredData = formatFilterData(getDataFromResponse(respData))

      console.log('DONE fetching filter data ...', allFilteredData)

      dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false })
      dispatch({ type: 'SET_FILTER_DATA', payload: allFilteredData })

      // setFilterData(allFilteredData)
   }

   // On component initial render
   useEffect(() => {
      getAllFilterData()
   }, [])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }
      console.log('...........')

      dispatch({ type: 'SET_QUERY', payload: { query: buildQueryStringFromSelections(state.selections) } })
   }, [state.selections])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }
      console.log('Loading data from params ...', state.filterParams)

      loadData()
   }, [state.filterParams])

   function afterDataLoads(items) {
      // setHasResults()
      dispatch({ type: 'SET_HAS_RESULTS', payload: checkHasResults(items) })
      // setHasNextPage()
      // setHasPrevPage()
      dispatch({ type: 'SET_HAS_NEXT_PAGE', payload: checkNextPage(items) })
      dispatch({ type: 'SET_HAS_PREV_PAGE', payload: checkPrevPage(items) })

      // setSearchData(items)
      dispatch({ type: 'SET_SEARCH_DATA', payload: items })
      // setIsLoading(false)
      dispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   function beforeDataLoads() {
      // setIsLoading(true)
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
            {state.componentOptions.showSelections ? <FilterSelections /> : ''}
            {state.componentOptions.showSorting ? <FilterSorting /> : ''}
            {state.componentOptions.showPagination ? <FilterPagination /> : ''}

            <FilterOptions />
            <FilterDropzone />
         </FiltersContext.Provider>
      </>
   )
}

export { Filters, FiltersContext }
