import isEmpty from 'lodash/isEmpty';

function checkNextPage(items) {

   if (!items || items.length == 0) {
      return false;
   }

   return items[items.length - 1].hasNextPage;

}


function checkPrevPage(items) {

   if (!items || items.length == 0) {
      return false;
   }

   return items[0].hasPreviousPage;

}


function checkHasResults(items) {
   return !isEmpty(items);
}


export {
   checkNextPage,
   checkPrevPage,
   checkHasResults
}