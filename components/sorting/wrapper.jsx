import React, { useContext, useState } from 'react';
import { FiltersContext } from '../filters';

function getSelectedOption(select) {
   return select.options[select.selectedIndex];
}

function hasReverse(select) {

   var selectedOption = getSelectedOption(select);

   return selectedOption.hasAttribute("data-wps-reverse");

}


function SortingWrapper() {

   const { setSortKey, setReverse } = useContext(FiltersContext);
   const [optionState, setOptionState] = useState("default");

   function onChange(event) {

      if (hasReverse(event.target)) {
         setReverse(true);

      } else {
         setReverse(false);
      }

      setSortKey(event.target.value);
      setOptionState(event.target.value);

   }


   return (

      <div className="wps-component wps-comonent-sorting">

         <label className="wps-sorting-heading" htmlFor="wps-sorting">Sort by:</label>

         <select value={optionState} id="wps-sorting" onChange={e => onChange(e)}>
            <option value="default" disabled="disabled">Choose an option</option>
            <option value="PRICE">Price (Low to high)</option>
            <option value="PRICE" data-wps-reverse>Price (High to low)</option>
            <option value="CREATED_AT" data-wps-reverse>New Arrival</option>
            <option value="BEST_SELLING">Best Selling</option>
            <option value="TITLE">Title (A-Z)</option>
            <option value="TITLE" data-wps-reverse>Title (Z-A)</option>
         </select>

      </div>

   )

}

export {
   SortingWrapper
}