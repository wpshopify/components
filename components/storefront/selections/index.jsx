import React, { useContext, useEffect, useRef } from 'react'
import { StorefrontContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'

import { StorefrontSelectionsWrapper } from './wrapper'
import { objectIsEmpty, capitalizeFirstLetter } from '../../../common/utils'
import { usePortal } from '../../../common/hooks'
import { filterObj, commaToArray, buildQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import isEmpty from 'lodash/isEmpty'
import mapKeys from 'lodash/mapKeys'
import compact from 'lodash/compact'
import forOwn from 'lodash/forOwn'
import transform from 'lodash/transform'
import map from 'lodash/map'

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

            return selections[filterType].map(function(value, i, arr) {
               if (arr.length - 1 !== i) {
                  var connective = ' ' + itemsState.componentOptions.connective.toUpperCase()
               } else {
                  var connective = ''
               }

               return filterType + ':' + '"' + value + '"' + connective
            })
         })
      )
   }

   function buildQueryStringFromSelections(selections) {
      if (isEmpty(selections)) {
         return '*'
      }

      const normalizedSelects = normalizeKeysForShopifyQuery(selections)

      let newQuery = stringifyFilterTypes(combineFilterTypes(normalizedSelects, Object.keys(normalizedSelects)))

      console.log('newQuery', newQuery)

      if (newQuery === '') {
         newQuery = '*'
      }

      return newQuery
   }

   function updateFetchParamsQuery() {
      console.log('updateFetchParamsQuery', storefrontState.selections)

      return {
         query: buildQueryStringFromSelections(storefrontState.selections)
      }
   }

   function getInitialSelections(filterParams) {
      return transform(
         filterObj(filterParams),
         function(result, value, key) {
            if (key === 'productType') {
               key = 'types'
            } else {
               key = key + 's'
            }

            return (result[key] = map(commaToArray(value), val => val.toLowerCase()))
         },
         {}
      )
   }

   function setInitialSelections() {
      var initialSelections = getInitialSelections(storefrontState.componentOptions.filterParams)

      storefrontDispatch({
         type: 'SET_SELECTIONS',
         payload: initialSelections
      })

      forOwn(initialSelections, function(value, key) {
         storefrontDispatch({
            type: 'SET_SELECTED_' + key.toUpperCase(),
            payload: value
         })
      })
   }

   useEffect(() => {
      console.log('HITTING THISs', isFirstRender.current)

      if (isFirstRender.current) {
         setInitialSelections()

         isFirstRender.current = false
         return
      }

      console.log('itemsState.lastQuery', itemsState.lastQuery)
      console.log('itemsState.queryParams.query', itemsState.queryParams.query)

      // if (itemsState.lastQuery !== itemsState.queryParams.query) {
      //    console.log('...... THEY DONT EQUAL, FETCHING NEW API REQUEST')

      //    itemsDispatch({ type: 'SET_QUERY_PARAMS', payload: updateFetchParamsQuery() })
      // } else {
      //    console.log("...... THEY'RE EQUAL")
      // }

      itemsDispatch({ type: 'SET_QUERY_PARAMS', payload: updateFetchParamsQuery() })
   }, [storefrontState.selections])

   return usePortal(!objectIsEmpty(storefrontState.selections) ? <StorefrontSelectionsWrapper /> : '', document.querySelector(itemsState.componentOptions.dropzoneSelections))
}

export { StorefrontSelections }
