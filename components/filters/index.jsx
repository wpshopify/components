import React, { useEffect, useState } from 'react';
import { getAllTags, getFilterData } from '@wpshopify/api';
import FilterVendors from './vendors';
import { FilterTags } from './tags';
import { FilterSelections } from './selections';

import assign from 'lodash/assign';
import to from 'await-to-js';

const FiltersContext = React.createContext();


function combineFilterData(accumulator, currentValue) {
   return assign(accumulator, currentValue);
}

function formatFilterData(data) {
   return data.reduce(combineFilterData);
}

function getDataFromResponse(response) {
   return response.map(item => item.data);
}









function Filters({ dropZone, showSelections, selectionsDropZone }) {

   const [selections, setSelections] = useState({});
   const [filterData, setFilterData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [query, setQuery] = useState(false);

   console.log('selectionsDropZone ', selectionsDropZone);
   console.log('showSelections ', showSelections);

   async function getAllFilterData() {

      var [respError, respData] = await to(getFilterData());
      console.log('Filters error ', respError);

      var allFilteredData = formatFilterData(getDataFromResponse(respData));

      console.log('allFilteredData', allFilteredData);

      setIsLoading(false);
      setFilterData(allFilteredData);

   }


   // On component mount
   useEffect(() => {
      console.log('dropZone ', dropZone);

      getAllFilterData();

   }, []);


   return (
      <aside className="wps-filters">

         <h2 className="wps-filters-heading">Filter by</h2>

         <FiltersContext.Provider value={{
            data: filterData,
            isLoading: isLoading,
            query: query,
            setQuery: setQuery,
            selections: selections,
            setSelections: setSelections
         }}>

            {showSelections ? <FilterSelections dropZone={selectionsDropZone} /> : ''}

            <FilterTags />
            <FilterVendors />
         </FiltersContext.Provider>

      </aside >
   )

}

export {
   Filters,
   FiltersContext
}
