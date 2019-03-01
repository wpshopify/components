import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import without from 'lodash/without';


function removeFrom(array, valueToRemove) {
   return without(array, valueToRemove);
}

function objectIsEmpty(object) {

   if (isEmpty(object)) {
      return true;
   }

   var foundNone = true;

   forOwn(object, function (value, key) {

      if (!isEmpty(value)) {
         foundNone = false;
      }

   });

   return foundNone;

}

export {
   objectIsEmpty,
   removeFrom
}