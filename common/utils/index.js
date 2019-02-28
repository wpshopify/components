import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import without from 'lodash/without';


function removeFrom(array, valueToRemove) {
   return without(array, valueToRemove);
}

function hasSelections(object) {

   if (isEmpty(object)) {
      return false;
   }

   var foundSome = false;

   forOwn(object, function (value, key) {

      if (!isEmpty(value)) {
         foundSome = true;
      }

   });

   return foundSome;

}

export {
   hasSelections,
   removeFrom
}