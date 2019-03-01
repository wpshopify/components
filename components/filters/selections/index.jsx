import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import isEmpty from 'lodash/isEmpty';

import { FiltersContext } from '../index';
import { FilterSelectionsWrapper } from './wrapper';
import { objectIsEmpty } from '../../../common/utils';



function FilterSelections({ dropZone }) {

   const { selections } = useContext(FiltersContext);

   return (
      <>
         {
            ReactDOM.createPortal(
               !objectIsEmpty(selections) ? <FilterSelectionsWrapper /> : '',
               document.querySelector(dropZone)
            )
         }
      </>
   )

}

export {
   FilterSelections
}