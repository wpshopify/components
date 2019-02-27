import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';

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
   hasSelections
}