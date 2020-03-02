import isEmpty from 'lodash/isEmpty'
import forOwn from 'lodash/forOwn'
import without from 'lodash/without'
import mapKeys from 'lodash/mapKeys'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isMatch from 'lodash/isMatch'

import md5 from 'js-md5'

import { format } from 'date-fns'
import { textDomain } from '../globals'

import { decodePayloadSettings } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

const { __ } = wp.i18n

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

function isPairMatch(compareAgaisnt, pairToMatch) {
  if (isEmpty(pairToMatch)) {
    return false
  }

  if (isArray(compareAgaisnt)) {
    return !isEmpty(compareAgaisnt.filter(obj => isMatch(obj, pairToMatch)))
  } else {
    return isMatch(compareAgaisnt, pairToMatch)
  }
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

  return 'wps-w-' + perRow
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
  return title.replace(/\s+/g, '-').toLowerCase()
}

function createStringFromQueryParams(queryParams) {
  if (!queryParams.sortKey) {
    var sortKey = ''
  } else {
    if (isString(queryParams.sortKey)) {
      var sortKey = queryParams.sortKey
    } else {
      var sortKey = queryParams.sortKey.key
    }
  }

  if (!queryParams.reverse) {
    var reverse = ''
  } else {
    var reverse = queryParams.reverse
  }

  return queryParams.first + queryParams.query + reverse + sortKey
}

function getHashFromQueryParams(queryParams) {
  return md5(createStringFromQueryParams(queryParams))
}

function FilterHook({ name, defaultVal = false, args, isReady }) {
  if (!args) {
    args = []
  }

  return (
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

function toCamel(s) {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

function underscoreToCamel(o) {
  if (isArray(o)) {
    return o
  }

  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = underscoreToCamel(o[k])
    })

    return n
  }

  return o
}

function decodeComponentPayloadSettings(payloadSettingsId) {
  return underscoreToCamel(decodePayloadSettings(payloadSettingsId))
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
  getHashFromQueryParams,
  FilterHook,
  prettyDate,
  _t,
  underscoreToCamel,
  decodeComponentPayloadSettings,
  isPairMatch
}
