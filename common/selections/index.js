import union from 'lodash/union';
import without from 'lodash/without';
import difference from 'lodash/difference';

function updateSelectionList(params) {

   if (!params.isSelected) {
      return without(params.currentList, params.selectedValue);
   }

   return union([params.selectedValue], params.currentList);

}


function isSelectionsOfTypeEmpty(selections, type) {
   return !selections[type];
}

function findModifiedSelection(localSelectedState, globalSelectionsTypeList) {
   return difference(localSelectedState, globalSelectionsTypeList);
}

function changedSelectionMatch(changedValues, localValue) {
   return changedValues[0] === localValue;
}

export {
   updateSelectionList,
   isSelectionsOfTypeEmpty,
   findModifiedSelection,
   changedSelectionMatch
}