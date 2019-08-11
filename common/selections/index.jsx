import { useState } from 'react'

import union from 'lodash/union'
import without from 'lodash/without'
import difference from 'lodash/difference'
import isEmpty from 'lodash/isEmpty'
import hasIn from 'lodash/hasIn'
import { objectIsEmpty } from '../utils'

function updateSelectionList(params) {
   if (!params.isSelected) {
      return without(params.currentList, params.selectedValue)
   }

   return union([params.selectedValue], params.currentList)
}

function isSelectionsOfTypeEmpty(selections, type) {
   return !selections[type]
}

function findDeselectedValue(localSelectedState, globalSelectionsTypeList) {
   return difference(localSelectedState, globalSelectionsTypeList)
}

function foundDeselectedValue(removedValue, localValue) {
   return removedValue[0] === localValue
}

function getSelectionTypes(selections) {
   var filterTypes = Object.keys(selections)

   if (isEmpty(filterTypes) || objectIsEmpty(selections)) {
      return []
   }

   return filterTypes
}

/*

When selections are removed ...

*/
function isCurrentlySelected(selections, valueSelected, type) {
   var selected = false

   if (isEmpty(selections)) {
      selected = false
   } else {
      if (!hasIn(selections, type)) {
         selected = false
      } else if (selections[type].find(value => valueSelected === value)) {
         selected = true
      }
   }

   return selected
}

function createSelectionsOfType(itemType, typeSelections) {
   const temp = {}

   temp[itemType] = typeSelections

   return temp
}

function buildNewSelection(itemValue, itemType, isSelected, existingSelections) {
   if (!itemValue) {
      return updateSelectionList({
         currentList: existingSelections[itemType]
      })
   }

   return updateSelectionList({
      isSelected: !isSelected,
      currentList: existingSelections[itemType],
      selectedValue: itemValue.toLowerCase()
   })
}

export { updateSelectionList, isSelectionsOfTypeEmpty, findDeselectedValue, foundDeselectedValue, isCurrentlySelected, getSelectionTypes, createSelectionsOfType, buildNewSelection }
