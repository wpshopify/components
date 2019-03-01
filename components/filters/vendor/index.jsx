import React, { useEffect, useState, useContext, useRef } from 'react';
import { FiltersContext } from '../index';
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections';

function FilterVendor({ vendor, selectedVendors, setSelectedVendors }) {

   const { selections, setSelections, isCleared, isSelectionsRemoved } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);
   const isFirstRender = useRef(true);


   useEffect(() => {

      console.log('useEffect selections from <FilterVendor />');

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      console.log('111111');

      setIsSelected(isCurrentlySelected(selections, vendor, 'vendor'));

   }, [selectedVendors]);


   const onClick = () => {

      console.log('onClick from <FilterVendor />');
      setIsSelected(!isSelected);

      // var newList = updateSelectionList({
      //    isSelected: !isSelected,
      //    currentList: selections.vendor,
      //    selectedValue: vendor
      // });

      setSelections({ vendor: [vendor] });
      setSelectedVendors([vendor]);

   }

   return (
      <div
         className="wps-vendor"
         data-wps-is-selected={isSelected}>

         <input
            id={"input-" + vendor}
            type="checkbox"
            className="wps-input-value"
            onClick={onClick}></input>

         <label htmlFor={"input-" + vendor} className="wps-input-label">{vendor}</label>

      </div>
   )

}

export {
   FilterVendor
}