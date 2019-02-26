import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FiltersContext } from '../index';
import forOwn from 'lodash/forOwn';
import isEmpty from 'lodash/isEmpty';

function FilterSelections({ dropZone }) {

   const { selections } = useContext(FiltersContext);

   // console.log('selections', selections);
   // console.log('dropZone ', dropZone);



   useEffect(() => {

      console.log('selections ', selections);

   }, [selections]);


   function renderSelectionValue(val) {

      return <span
         className="wps-filter-selection-value"
         key={val}
         style={{ margin: '10px', padding: '5px', outline: '1px solid red' }}>

         {val}
      </span>

   }

   function renderSelectionValues(values) {
      return values.map(value => renderSelectionValue(value));
   }

   function createSelectionGroup(selections, keyName) {

      return (
         <>
            <span className="wps-filter-selection-type-heading">{keyName}: </span>
            {renderSelectionValues(selections[keyName])}
         </>

      )

   }

   function SelectionGroup({ selections, keyName, i }) {
      return (
         <p className="wps-selections-group" key={i}>
            {createSelectionGroup(selections, keyName)}
         </p>
      )
   }

   function createSelections(selections) {

      var filterTypes = Object.keys(selections);

      if (isEmpty(filterTypes)) {
         return;
      }

      return (
         <>
            {
               filterTypes.map((keyName, i) => {

                  return (
                     <div className="wps-filter-selection-type" key={i}>
                        <SelectionGroup selections={selections} keyName={keyName} i={i} />
                     </div>
                  )

               })
            }
         </>
      )


   }


   function hasSelections(selections) {

      if (isEmpty(selections)) {
         return false;
      }

      var foundSome = false;

      forOwn(selections, function (value, key) {

         if (!isEmpty(value)) {
            foundSome = true;
         }

      });

      return foundSome;

   }


   function renderAllSelections(selections) {

      if (!hasSelections(selections)) {
         return;
      }

      return createSelections(selections);

   }


   return (
      <div>

         {ReactDOM.createPortal(
            <div className="wps-filter-selections">
               {renderAllSelections(selections)}
            </div>,
            document.querySelector(dropZone)
         )}

      </div>

   )
}

export {
   FilterSelections
}