import isEmpty from "lodash/isEmpty"
import forOwn from "lodash/forOwn"
import without from "lodash/without"
import mapKeys from "lodash/mapKeys"
import isString from "lodash/isString"
import md5 from "js-md5"

import React from "react"
import ReactDOM from "react-dom"
import { format, formatDistance, subDays } from "date-fns"
import { __ } from "@wordpress/i18n"
import { textDomain } from "../globals"

function removeFrom(array, valueToRemove) {
  return without(array, valueToRemove)
}

function objectIsEmpty(object) {
  if (isEmpty(object)) {
    return true
  }

  var foundNone = true

  forOwn(object, function(value, key) {
    if (!isEmpty(value)) {
      foundNone = false
    }
  })

  return foundNone
}

function createObj(name, value) {
  const newObbj = {}

  newObbj[name] = value

  return newObbj
}

/*

Lowercase Object Keys

*/
function lowercaseObjKeys(obj) {
  return mapKeys(obj, (value, key) => key.toLowerCase())
}

function capitalizeFirstLetter(string) {
  return string.toLowerCase().replace(/^\w/, c => c.toUpperCase())
}

function itemWidthClass(perRow) {
  if (perRow > 12) {
    perRow = 12
  } else if (!perRow) {
    perRow = 1
  }

  return "wps-w-" + perRow
}

function findPortalElement(element, dropzone) {
  if (dropzone) {
    return document.querySelector(dropzone)
  } else if (element) {
    return element
  } else {
    return false
  }
}

function convertTitleToHandle(title) {
  return title.replace(/\s+/g, "-").toLowerCase()
}

function createStringFromQueryParams(queryParams) {
  if (!queryParams.sortKey) {
    var sortKey = ""
  } else {
    if (isString(queryParams.sortKey)) {
      var sortKey = queryParams.sortKey
    } else {
      var sortKey = queryParams.sortKey.key
    }
  }

  if (!queryParams.reverse) {
    var reverse = ""
  } else {
    var reverse = queryParams.reverse
  }

  return queryParams.first + queryParams.query + reverse + sortKey
}

function hashQueryParams(queryParams) {
  return md5(createStringFromQueryParams(queryParams))
}

function hasHooks() {
  return typeof wp !== "undefined" && wp.hooks
}

function FilterHook({ name, defaultVal = false, args, isReady }) {
  if (!args) {
    args = []
  }

  return (
    hasHooks() &&
    wp.hooks.hasFilter(name) && (
      <div
        data-wps-is-ready={isReady}
        dangerouslySetInnerHTML={{
          __html: wp.hooks.applyFilters(name, defaultVal, ...args)
        }}
      />
    )
  )
}

function prettyDate(rawDate, formatting) {
  return format(new Date(rawDate), formatting)
}

function _t(string) {
  return __(string, textDomain)
}

export {
  objectIsEmpty,
  createObj,
  removeFrom,
  lowercaseObjKeys,
  capitalizeFirstLetter,
  itemWidthClass,
  findPortalElement,
  convertTitleToHandle,
  hashQueryParams,
  hasHooks,
  FilterHook,
  prettyDate,
  _t
}
