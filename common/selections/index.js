import { useState } from 'react';

import union from 'lodash/union';
import without from 'lodash/without';
import difference from 'lodash/difference';
import isEmpty from 'lodash/isEmpty';
import { objectIsEmpty } from '../utils';

function updateSelectionList(params) {

   if (!params.isSelected) {
      return without(params.currentList, params.selectedValue);
   }

   return union([params.selectedValue], params.currentList);

}


function isSelectionsOfTypeEmpty(selections, type) {
   return !selections[type];
}

function findDeselectedValue(localSelectedState, globalSelectionsTypeList) {
   return difference(localSelectedState, globalSelectionsTypeList);
}

function foundDeselectedValue(removedValue, localValue) {
   return removedValue[0] === localValue;
}



function getSelectionTypes(selections) {

   var filterTypes = Object.keys(selections);

   if (isEmpty(filterTypes) || objectIsEmpty(selections)) {
      return [];
   }

   return filterTypes;

}






















/*

When selections are removed ...

*/
function useSelectionsRemoved(selections, type, localValue, localValues) {

   const [isDeselected, setIsDeselected] = useState(false);

   // If selections of [type] are empty, then it was removed
   if (isSelectionsOfTypeEmpty(selections, type)) {
      setIsDeselected(true);
   }

   var deselectedValue = findDeselectedValue(localValues, selections[type]);

   if (foundDeselectedValue(deselectedValue, localValue)) {
      setIsDeselected(true);
   }

   return {
      isDeselected: isDeselected,
      updatedSelections: selections[type]
   }

}















export {
   updateSelectionList,
   isSelectionsOfTypeEmpty,
   findDeselectedValue,
   foundDeselectedValue,
   useSelectionsRemoved,
   getSelectionTypes
}