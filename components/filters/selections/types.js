import React, { useContext } from 'react';
import { FilterSelectionsValues } from './values';
import { SelectionsContext } from './index';

function FilterSelectionsType({ selections, keyName }) {

   return (
      <div className="wps-filter-selection-type" key={keyName}>
         <div className="wps-selections-group">
            <span className="wps-filter-selection-type-heading">{keyName}: </span>
            <FilterSelectionsValues vals={selections[keyName]} />
         </div>
      </div>
   )
}

function FilterSelectionsTypes() {

   const { selections, types } = useContext(SelectionsContext);

   return types.map(filterName => <FilterSelectionsType selections={selections} key={filterName} keyName={filterName} />);

}

export {
   FilterSelectionsTypes
}