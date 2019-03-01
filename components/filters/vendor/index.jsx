import React, { useEffect, useState, useContext, useRef } from 'react';
import { FiltersContext } from '../index';

function FilterVendor({ vendor }) {

   const { selections, setSelections, isCleared, isSelectionsRemoved } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);
   const isFirstRender = useRef(true);

   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // var newTagsList = updateSelectionList({
      //    isSelected: isSelected,
      //    currentList: selections.tag,
      //    selectedValue: tag
      // });

      // setSelectedTags(newTagsList);

      console.log('setSelections from <FilterVendor>');

      setSelections({ vendor: [vendor] });

      console.log('Selections: ', selections);
      console.log('Vendor: ', vendor);

   }, [isSelected]);


   return (
      <div
         className="wps-vendor"
         data-wps-is-selected={isSelected}>

         <input
            id={"input-" + vendor}
            type="checkbox"
            className="wps-input-value"
            onClick={e => setIsSelected(!isSelected)}></input>

         <label htmlFor={"input-" + vendor} className="wps-input-label">{vendor}</label>

      </div>
   )

}

export {
   FilterVendor
}