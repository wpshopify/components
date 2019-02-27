import React, { useContext, useEffect } from 'react';
import { FiltersContext } from '../index';


function FilterSelectionsClear() {

   const { setSelections, setIsCleared } = useContext(FiltersContext);

   function removeSelections() {

      console.log('removedSelections');

      setIsCleared(true);
      setSelections({});

   }

   useEffect(() => {
      console.log('____________ hi');

      setIsCleared(false);

   }, []);


   return (
      <div className="wps-filter-selections-clear" onClick={removeSelections}>Clear all</div>
   )

}

export {
   FilterSelectionsClear
}
