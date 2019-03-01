import React, { useContext, useEffect } from 'react';
import { FiltersContext } from '../index';


function FilterSelectionsClear() {

   const { setSelections, isCleared, setIsCleared, isSelectionsRemoved, setIsSelectionsRemoved } = useContext(FiltersContext);

   function removeSelections() {

      console.log('setSelections from <FilterSelectionsClear>');

      setSelections({});
      // setIsCleared(!isCleared);
      // setIsSelectionsRemoved(!isSelectionsRemoved);

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
