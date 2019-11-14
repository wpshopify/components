import React, { useContext, useEffect, useRef } from "react"
import { StorefrontContext } from "../_state/context"
import { ItemsContext } from "../../items/_state/context"

import { StorefrontSelectionsWrapper } from "./wrapper"
import { objectIsEmpty, capitalizeFirstLetter } from "../../../common/utils"
import { usePortal } from "../../../common/hooks"
import {
  filterObj,
  commaToArray,
  buildQuery
} from "/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api"
import isArray from "lodash/isArray"
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
import mapKeys from "lodash/mapKeys"
import compact from "lodash/compact"
import forOwn from "lodash/forOwn"
import transform from "lodash/transform"
import map from "lodash/map"
import has from "lodash/has"

function StorefrontSelections() {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

  const isFirstRender = useRef(true)

  function updateFetchParamsQuery() {
    return {
      query: buildQueryStringFromSelections(
        storefrontState.selections,
        itemsState.componentOptions.connective
      )
    }
  }

  function getInitialSelections(filterParams) {
    return transform(
      filterObj(filterParams),
      function(result, value, key) {
        if (key === "productType") {
          key = "types"
        } else {
          key = key + "s"
        }

        if (isArray(value)) {
          return (result[key] = map(value, val => val.toLowerCase()))
        } else {
          return (result[key] = [value.toLowerCase()])
        }
      },
      {}
    )
  }

  function setInitialSelections() {
    var initialSelections = getInitialSelections(
      storefrontState.componentOptions.filterParams
    )

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: initialSelections
    })

    forOwn(initialSelections, function(value, key) {
      storefrontDispatch({
        type: "SET_SELECTED_" + key.toUpperCase(),
        payload: value
      })
    })
  }

  useEffect(() => {
    if (isFirstRender.current) {
      setInitialSelections()

      isFirstRender.current = false
      return
    }

    itemsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: updateFetchParamsQuery()
    })
  }, [storefrontState.selections])

  return usePortal(
    !objectIsEmpty(storefrontState.selections) ? (
      <StorefrontSelectionsWrapper />
    ) : (
      ""
    ),
    document.querySelector(itemsState.componentOptions.dropzoneSelections)
  )
}

function buildQueryStringFromSelections(selections, connective) {
  if (isEmpty(selections)) {
    return "*"
  }

  const normalizedSelects = normalizeKeysForShopifyQuery(selections)

  let newQuery = stringifyFilterTypes(
    combineFilterTypes(
      normalizedSelects,
      Object.keys(normalizedSelects),
      connective
    )
  )

  if (newQuery === "") {
    newQuery = "*"
  }

  if (has(selections, "available_for_sale") && !selections.available_for_sale) {
    newQuery += " available_for_sale:false"
  }

  return newQuery
}

/*

Annoying, but needs to be done to make the filter components easier to deal with

*/
function normalizeKeysForShopifyQuery(selections) {
  return mapKeys(selections, function(value, key) {
    if (key === "tags") {
      return "tag"
    }

    if (key === "vendors") {
      return "vendor"
    }

    if (key === "types") {
      return "product_type"
    }

    if (key === "titles") {
      return "title"
    }

    return key
  })
}

function stringifyFilterTypes(filterTypes) {
  if (!filterTypes) {
    return ""
  }

  var joinedTypes = filterTypes.map(joinFilteredValues)

  if (isEmpty(joinedTypes)) {
    return ""
  }

  return joinedTypes.join(" ")
}

function combineFilterTypes(selections, filterTypes, connectiveValue) {
  return compact(
    filterTypes.map((filterType, index) => {
      if (isEmpty(selections[filterType])) {
        return
      }

      if (isString(selections[filterType])) {
        return filterType + ":" + '"' + selections[filterType] + '"'
      } else {
        return selections[filterType].map(function(value, i, arr) {
          if (arr.length - 1 !== i) {
            var connective = " " + connectiveValue.toUpperCase()
          } else {
            var connective = ""
          }

          return filterType + ":" + '"' + value + '"' + connective
        })
      }
    })
  )
}

function joinFilteredValues(value) {
  if (isEmpty(value)) {
    return ""
  }

  if (isString(value)) {
    return value
  }

  return value.join(" ")
}

export { StorefrontSelections, buildQueryStringFromSelections }
