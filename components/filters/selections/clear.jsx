import React, { useContext, useEffect } from 'react';
import { FiltersContext } from '../index';


function FilterSelectionsClear() {

   const { setSelections, isCleared, setIsCleared, isModified, setIsModified } = useContext(FiltersContext);

   function removeSelections() {

      setSelections({});
      setIsCleared(!isCleared);
      setIsModified(!isModified);

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
