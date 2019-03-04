import React, { useEffect, useState, useRef } from 'react';
import { getFilterData, queryProducts, fetchByQueryParams } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import FilterVendors from './vendors';
import { FilterTags } from './tags';
import { FilterSelections } from './selections';
import { DropZone } from '../dropzone';
import { LoadingContext } from '../../common/context';
import { Sorting } from '../sorting';

import assign from 'lodash/assign';
import to from 'await-to-js';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import size from 'lodash/size';


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

   return joinedTypes.join(' ');

}



function buildQueryStringFromSelections(selections) {

   if (isEmpty(selections)) {
      return;
   }

   var keys = Object.keys(selections);

   return stringifyFilterTypes(combineFilterTypes(selections, keys));

}





























function Filters({ dropZone, showSelections, selectionsDropZone, showSorting, sortingDropZone }) {

   const [selections, setSelections] = useState({});
   const [filterData, setFilterData] = useState([]);
   const [searchData, setSearchData] = useState([]);

   const [isLoading, setIsLoading] = useState(true);
   const [isCleared, setIsCleared] = useState(true);
   const [isFiltering, setIsFiltering] = useState(false);

   const [query, setQuery] = useState('*');
   const [pageSize, setPageSize] = useState(9);
   const [sortKey, setSortKey] = useState('TITLE');
   const [reverse, setReverse] = useState(false);


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

      console.log('selections ..........', selections);
      var queryString = buildQueryStringFromSelections(selections);

      console.log('queryString ', queryString);

      setQuery(queryString);

   }, [selections]);






   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      loadData();

   }, [query, sortKey, reverse]);




   function getFetchParams() {

      return {
         pageSize: pageSize,
         sortKey: sortKey,
         query: query,
         reverse: reverse
      }

   }



   async function loadData() {

      try {

         setIsFiltering(true);

         var response = await fetchProducts(getFetchParams());

         setSearchData(response);
         setIsFiltering(false);

      } catch (error) {
         console.log('error ', error);
      }

   }



   function fetchProducts(params) {
      return queryProducts(fetchByQueryParams(getFetchParams()));
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
            sortKey: sortKey,
            setSortKey: setSortKey,
            selections: selections,
            setSelections: setSelections,
            setReverse: setReverse
         }}>

            {showSelections ? <FilterSelections dropZone={selectionsDropZone} /> : ''}
            {showSorting ? <Sorting dropZone={sortingDropZone} /> : ''}

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
