import React, { useContext, useEffect, useState } from 'react';
import Anime from 'react-anime';
import { IconRemove } from "../../../common/icons/icon-remove.jsx";
import { removeFrom } from "../../../common/utils";
import { FiltersContext } from '../index';



function inSelection(selectionsArray, valToSearchFor) {
   return selectionsArray.find(element => element === valToSearchFor);
}


function FilterSelectionsValue({ selectionType, val }) {

   const { selections, setSelections, isModified, setIsModified } = useContext(FiltersContext);
   const [isCleared, setIsCleared] = useState(false);
   const [isInitialRender, setIsInitialRender] = useState(true);


   function removeValueFromSelections(val) {

      var selectionsCopy = selections;

      if (inSelection(selectionsCopy[selectionType], val)) {
         return removeFrom(selectionsCopy[selectionType], val);
      }

      // If not found, just return the original list
      return selectionsCopy[selectionType];

   }

   function buildNewSelectionObject(type, newStuff) {

      var newBuild = {}

      newBuild[type] = newStuff;

      return newBuild;

   }

   useEffect(() => {

      if (isInitialRender) {
         setIsInitialRender(false);
         return;
      }

      setSelections(buildNewSelectionObject(selectionType, removeValueFromSelections(val)));
      setIsModified(!isModified);

   }, [isCleared]);


   return (
      <span className="wps-filter-selection-value" onClick={e => { setIsCleared(true) }}> {val} <IconRemove /> </span>
   )

}

function FilterSelectionsValues({ selectionType, vals }) {

   let animeProps = {
      opacity: [0, 1],
      translateY: [-64, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 200
   }

   return (
      <Anime {...animeProps}>
         vals.map(val => <FilterSelectionsValue key={val} selectionType={selectionType} val={val} />);
      </Anime>
   )

}

export {
   FilterSelectionsValues
}