import React, { useEffect, useState, useContext, useRef } from 'react';
import { FiltersContext } from '../index';
import update from 'immutability-helper';
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections';


function FilterType({ type, selectedTypes, setSelectedTypes }) {

   const { selections, setSelections } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);
   const isFirstRender = useRef(true);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      setIsSelected(isCurrentlySelected(selections, type, 'product_type'));

   }, [selectedTypes]);




   const onClick = () => {

      setIsSelected(!isSelected);

      var newList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.product_type,
         selectedValue: type
      });

      const updatedSelections = update(selections, { $merge: { product_type: newList } });

      setSelections(updatedSelections);
      setSelectedTypes(newList);

   }

   return (
      <div
         className="wps-input-wrapper"
         data-wps-is-selected={isSelected}>

         <input
            id={"input-" + type}
            type="checkbox"
            checked={isSelected ? 'checked' : ''}
            className="wps-input-value"
            onChange={onClick}></input>

         <label htmlFor={"input-" + type} className="wps-input-label">{type}</label>

      </div>
   )

}

export {
   FilterType
}