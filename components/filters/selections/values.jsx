import React, { useContext, useRef, useEffect, useState } from 'react';
import { IconRemove } from "../../../common/icons/icon-remove.jsx";
import { removeFrom } from "../../../common/utils";
import { FiltersContext } from '../index';
import { useSpring, useTransition, animated } from 'react-spring'


function inSelection(selectionsArray, valToSearchFor) {
   return selectionsArray.find(element => element === valToSearchFor);
}


function FilterSelectionsValue({ selectionType, val }) {

   const { selections, setSelections, isSelectionsRemoved, setIsSelectionsRemoved } = useContext(FiltersContext);
   const [isCleared, setIsCleared] = useState(false);
   const isFirstRender = useRef(true);


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

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      console.log('setSelections from <FilterSelectionsValue>');

      setSelections(buildNewSelectionObject(selectionType, removeValueFromSelections(val)));

      setIsSelectionsRemoved(!isSelectionsRemoved);

   }, [isCleared]);


   return (
      <span className="wps-filter-selection-value" onClick={e => { setIsCleared(true) }}> {val} <IconRemove /> </span>
   )

}

function FilterSelectionsValues({ selectionType, vals }) {

   const transitions = useTransition(vals, item => item, {
      from: { transform: 'translateX(40px)' },
      enter: { transform: 'translateX(0)' },
      leave: { display: 'none' },
   })

   return transitions.map(({ item, props, key }) =>
      <animated.div key={key} style={props}>
         <FilterSelectionsValue key={item} selectionType={selectionType} val={item} />
      </animated.div>

   )

   // return vals.map(val => <FilterSelectionsValue key={val} selectionType={selectionType} val={val} />)

}

export {
   FilterSelectionsValues
}