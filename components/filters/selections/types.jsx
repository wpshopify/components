import React, { useContext } from 'react';
import { FilterSelectionsValues } from './values';
import { FiltersContext } from '../index';

import { getSelectionTypes } from './index';

function FilterSelectionsType({ selections, selectionType }) {

   return (
      <div className="wps-filter-selection-type" key={selectionType}>
         <div className="wps-selections-group">
            <span className="wps-filter-selection-type-heading">{selectionType}: </span>
            <FilterSelectionsValues selectionType={selectionType} vals={selections[selectionType]} />
         </div>
      </div>
   )
}

function FilterSelectionsTypes() {

   const { selections } = useContext(FiltersContext);

   const selectionTypes = getSelectionTypes(selections);

   return selectionTypes.map(selectionType => <FilterSelectionsType selections={selections} key={selectionType} selectionType={selectionType} />);

}

export {
   FilterSelectionsTypes
}