import React, { useContext, useEffect } from 'react';
import { FiltersContext } from '../index';


function FilterSelectionsClear() {

   const { setSelections, isCleared, setIsCleared, isSelectionsModified, setIsSelectionsModified } = useContext(FiltersContext);

   function removeSelections() {
      console.log('setSelections from <FilterSelectionsClear>');

      setSelections({});
      setIsCleared(!isCleared);
      setIsSelectionsModified(!isSelectionsModified);

   }

   useEffect(() => {
      setIsCleared(false);
   }, []);


   return (
      <div className="wps-filter-selections-clear" onClick={removeSelections}>Clear all</div>
   )

}

export {
   FilterSelectionsClear
}
