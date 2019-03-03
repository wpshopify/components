import { useState } from 'react';

import union from 'lodash/union';
import without from 'lodash/without';
import difference from 'lodash/difference';
import isEmpty from 'lodash/isEmpty';
import hasIn from 'lodash/hasIn';
import { objectIsEmpty } from '../utils';


function updateSelectionList(params) {

   if (!params.isSelected) {
      console.log('updateSelectionList 1');
      return without(params.currentList, params.selectedValue);
   }

   console.log('[params.selectedValue]', [params.selectedValue]);
   console.log('params.currentList', params.currentList);

   var sdofksodfk = union([params.selectedValue], params.currentList);

   console.log('updateSelectionList ', sdofksodfk);

   return sdofksodfk;

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
function isCurrentlySelected(selections, valueSelected, type) {

   // const isFirstRender = useRef(true);
   // const [isSelected, setIsSelected] = useState(false);
   // console.log('isCurrentlySelected', selections);
   // console.log('type', type);
   // console.log('selections[type]', selections[type]);

   var selected = false;

   if (isEmpty(selections)) {
      // console.log('2');
      // setIsSelected(false);
      selected = false;

   } else {

      if (!hasIn(selections, type)) {
         selected = false;

      } else if (selections[type].find(value => valueSelected === value)) {
         selected = true;
      }

   }

   return selected

}















export {
   updateSelectionList,
   isSelectionsOfTypeEmpty,
   findDeselectedValue,
   foundDeselectedValue,
   isCurrentlySelected,
   getSelectionTypes
}