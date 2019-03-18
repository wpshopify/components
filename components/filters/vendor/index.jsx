import React, { useEffect, useState, useContext, useRef } from 'react';
import { FiltersContext } from '../index';
import update from 'immutability-helper';
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections';


function FilterVendor({ vendor, selectedVendors, setSelectedVendors }) {

   const { selections, setSelections, isCleared, isSelectionsRemoved } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);
   const isFirstRender = useRef(true);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      setIsSelected(isCurrentlySelected(selections, vendor, 'vendor'));

   }, [selectedVendors]);




   const onClick = () => {

      setIsSelected(!isSelected);

      var newList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.vendor,
         selectedValue: vendor
      });

      const updatedSelections = update(selections, { $merge: { vendor: newList } });

      setSelections(updatedSelections);
      setSelectedVendors(newList);

   }

   return (
      <div
         className="wps-input-wrapper"
         data-wps-is-selected={isSelected}>

         <input
            id={"input-" + vendor}
            type="checkbox"
            checked={isSelected ? 'checked' : ''}
            className="wps-input-value"
            onChange={onClick}></input>

         <label htmlFor={"input-" + vendor} className="wps-input-label">{vendor}</label>

      </div>
   )

}

export {
   FilterVendor
}