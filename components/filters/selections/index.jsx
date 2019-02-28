import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import isEmpty from 'lodash/isEmpty';

import { FiltersContext } from '../index';
import { FilterSelectionsWrapper } from './wrapper';
import { hasSelections } from '../../../common/utils';



function getSelectionTypes(selections) {

   var filterTypes = Object.keys(selections);

   if (isEmpty(filterTypes) || !hasSelections(selections)) {
      return [];
   }

   return filterTypes;

}


function FilterSelections({ dropZone }) {

   const { selections } = useContext(FiltersContext);

   return (
      <>
         {
            ReactDOM.createPortal(
               hasSelections(selections) ? <FilterSelectionsWrapper /> : '',
               document.querySelector(dropZone)
            )
         }
      </>
   )

}

export {
   FilterSelections,
   getSelectionTypes
}