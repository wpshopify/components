import isEmpty from 'lodash/isEmpty'
import forOwn from 'lodash/forOwn'
import without from 'lodash/without'
import mapKeys from 'lodash/mapKeys'

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

export { objectIsEmpty, createObj, removeFrom, lowercaseObjKeys, capitalizeFirstLetter, itemWidthClass, findPortalElement, convertTitleToHandle }
