import React, { useEffect, useState, useRef } from 'react';
import { getFilterData, queryProducts, fetchByQueryParams } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import FilterVendors from './vendors';
import { FilterTags } from './tags';
import { FilterSelections } from './selections';
import { DropZone } from '../dropzone';
import { LoadingContext } from '../../common/context';

import assign from 'lodash/assign';
import to from 'await-to-js';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

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


function combineFilterTypes(selections, filterTypes) {

   return compact(filterTypes.map((filterType, index) => {

      if (isEmpty(selections[filterType])) {
         return;
      }

      return selections[filterType].map(value => filterType + ':' + value);

   }));
}


function joinFilteredValues(value) {

   if (isEmpty(value)) {
      return '';
   }

   return value.join(' ');

}

function stringifyFilterTypes(filterTypes) {

   if (!filterTypes) {
      return '';
   }

   var joinedTypes = filterTypes.map(joinFilteredValues);

   if (isEmpty(joinedTypes)) {
      return '';
   }

   return joinedTypes[0];

}

function buildQueryStringFromSelections(selections) {

   if (isEmpty(selections)) {
      return;
   }

   return stringifyFilterTypes(combineFilterTypes(selections, Object.keys(selections)));

}
























function Filters({ dropZone, showSelections, selectionsDropZone }) {

   const [selections, setSelections] = useState({});
   const [filterData, setFilterData] = useState([]);
   const [searchData, setSearchData] = useState([]);

   const [isLoading, setIsLoading] = useState(true);
   const [isCleared, setIsCleared] = useState(true);
   const [isFiltering, setIsFiltering] = useState(false);
   const [query, setQuery] = useState('*');
   const [isSelectionsRemoved, setIsSelectionsRemoved] = useState(false);
   const isFirstRender = useRef(true);


   async function getAllFilterData() {

      var [respError, respData] = await to(getFilterData());
      // console.log('Filters error ', respError);

      var allFilteredData = formatFilterData(getDataFromResponse(respData));

      console.log('allFilteredData', allFilteredData);

      setIsLoading(false);
      setFilterData(allFilteredData);

   }


   // On component initial render
   useEffect(() => {

      getAllFilterData();
      setSelections({});

   }, []);



   useEffect(() => {
      console.log('useEffect selections from <Filters />');

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      setQuery(buildQueryStringFromSelections(selections));

   }, [selections]);



   useEffect(() => {

      console.log('useEffect query');

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      loadData();

   }, [query]);








   /*
      
      When selections are changed ...
      
      */
   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // useSelectionsRemoved();

      // console.log('FilterTag isSelectionsRemoved');

      // if allTagsRemoved
      // if tagRemoved

      // if (isFirstRender.current) {
      //    isFirstRender.current = false;
      //    return;
      // }

      // // If selections of [type] are empty, zero everything out
      // if (isSelectionsOfTypeEmpty()) {

      //    setIsSelected(false);
      //    setSelectedTags([]);
      //    return;

      // }

      // var changedValues = findModifiedSelection(selectedTags, selections.tag);

      // if (changedSelectionMatch(changedValues, tag)) {
      //    setIsSelected(false);
      //    setSelectedTags(selections.tag);

      // }

   }, [isSelectionsRemoved]);










   async function loadData() {

      try {

         setIsFiltering(true);

         var response = await fetchProducts();

         setSearchData(response);
         setIsFiltering(false);

      } catch (error) {
         console.log('error ', error);
      }

   }



   function fetchProducts() {
      console.log('fetchByQueryParams(query)', fetchByQueryParams(query));
      console.log('fetchProducts from <Filters />');

      return queryProducts(fetchByQueryParams(query));
   }



   return (
      <aside className="wps-filters">

         <h2 className="wps-filters-heading">Filter by</h2>

         <FiltersContext.Provider value={{
            filterData: filterData,
            isLoading: isLoading,
            isCleared: isCleared,
            setIsCleared: setIsCleared,
            query: query,
            setQuery: setQuery,
            selections: selections,
            setSelections: setSelections,
            isSelectionsRemoved: isSelectionsRemoved,
            setIsSelectionsRemoved: setIsSelectionsRemoved
         }}>

            {showSelections ? <FilterSelections dropZone={selectionsDropZone} /> : ''}

            <FilterTags />
            <FilterVendors />

         </FiltersContext.Provider>

         <LoadingContext.Provider value={{ isFiltering: isFiltering, from: 'filters' }}>
            <DropZone dropZone={dropZone} items={searchData}></DropZone>
         </LoadingContext.Provider>

      </aside >
   )

}

export {
   Filters,
   FiltersContext
}
