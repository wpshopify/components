import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FiltersContext } from '../index';

import { FilterSelectionsWrapper } from './wrapper';

import { hasSelections } from '../../../common/utils';
import isEmpty from 'lodash/isEmpty';

const SelectionsContext = React.createContext();


function FilterSelections({ dropZone }) {

   const { selections } = useContext(FiltersContext);


   useEffect(() => {

      console.log('selections ', selections);

   }, [selections]);


   function getSelectionTypes(selections) {

      var filterTypes = Object.keys(selections);

      if (isEmpty(filterTypes) || !hasSelections(selections)) {
         return [];
      }

      return filterTypes;

   }



   return (
      <>
         {
            ReactDOM.createPortal(

               hasSelections(selections)
                  ? <SelectionsContext.Provider value={{ selections: selections, types: getSelectionTypes(selections) }}>
                     <FilterSelectionsWrapper />
                  </SelectionsContext.Provider>
                  : '',

               document.querySelector(dropZone)
            )
         }
      </>
   )

}

export {
   FilterSelections,
   SelectionsContext
}