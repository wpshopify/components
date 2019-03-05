import React, { useEffect, useState, useRef } from 'react';
import { getFilterData, queryProducts, fetchByQueryParams } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import FilterVendors from './vendors';
import { FilterTags } from './tags';
import { FilterSelections } from './selections';
import { DropZone } from '../dropzone';
import { LoadingContext } from '../../common/context';
import { Sorting } from '../sorting';
import { Pagination } from '../pagination';


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

   return joinedTypes.join(' ');

}



function buildQueryStringFromSelections(selections) {

   if (isEmpty(selections)) {
      return;
   }

   var keys = Object.keys(selections);

   return stringifyFilterTypes(combineFilterTypes(selections, keys));

}



function checkNextPage(items) {

   if (!items || items.length == 0) {
      return false;
   }

   return items[items.length - 1].hasNextPage;

}


function checkPrevPage(items) {

   if (!items || items.length == 0) {
      return false;
   }

   return items[0].hasPreviousPage;

}


function checkHasResults(items) {
   return !isEmpty(items);
}

















function Filters({ dropZone, showSelections, selectionsDropZone, showSorting, sortingDropZone, showPagination, paginationDropZone }) {

   const [selections, setSelections] = useState({});
   const [filterData, setFilterData] = useState([]);
   const [searchData, setSearchData] = useState([]);

   const [isLoading, setIsLoading] = useState(true);
   const [isBootstrapping, setIsBootstrapping] = useState(true);

   const [isCleared, setIsCleared] = useState(true);

   const [query, setQuery] = useState('*');
   const [pageSize, setPageSize] = useState(25);
   const [sortKey, setSortKey] = useState('TITLE');
   const [reverse, setReverse] = useState(false);
   const [hasResults, setHasResults] = useState(false);
   const [hasNextPage, setHasNextPage] = useState(true);
   const [hasPrevPage, setHasPrevPage] = useState(true);

   const isFirstRender = useRef(true);


   async function getAllFilterData() {

      var [respError, respData] = await to(getFilterData());

      var allFilteredData = formatFilterData(getDataFromResponse(respData));

      setIsBootstrapping(false);
      setFilterData(allFilteredData);

   }


   // On component initial render
   useEffect(() => {

      getAllFilterData();

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

   }, [query, sortKey, reverse, pageSize]);




   function getFetchParams() {

      return {
         pageSize: pageSize,
         sortKey: sortKey,
         query: query,
         reverse: reverse
      }

   }



   async function loadData() {
      console.log('calling loadData');

      try {

         setIsLoading(true);

         var items = await fetchProducts(getFetchParams());
         console.log('items', items);

         setHasResults(checkHasResults(items))
         setSearchData(items);
         setIsLoading(false);

         setHasNextPage(checkNextPage(items));
         setHasPrevPage(checkPrevPage(items));

      } catch (error) {
         console.log('error ', error);
      }

   }



   function fetchProducts() {
      return queryProducts(fetchByQueryParams(getFetchParams()));
   }



   return (
      <aside className="wps-filters">

         <h2 className="wps-filters-heading">Filter by</h2>

         <FiltersContext.Provider value={{
            isBootstrapping: isBootstrapping,
            filterData: filterData,
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            isCleared: isCleared,
            setIsCleared: setIsCleared,
            query: query,
            setQuery: setQuery,
            sortKey: sortKey,
            setSortKey: setSortKey,
            selections: selections,
            setSelections: setSelections,
            setReverse: setReverse,
            searchData: searchData,
            setSearchData: setSearchData,
            hasResults: hasResults,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            pageSize: pageSize,
            setPageSize: setPageSize
         }}>

            {showSelections ? <FilterSelections dropZone={selectionsDropZone} /> : ''}
            {showSorting ? <Sorting dropZone={sortingDropZone} /> : ''}
            {showPagination ? <Pagination dropZone={paginationDropZone} /> : ''}

            <FilterTags />
            <FilterVendors />

         </FiltersContext.Provider>

         <LoadingContext.Provider value={{ isLoading: isLoading, from: 'filters' }}>
            <DropZone dropZone={dropZone} items={searchData}></DropZone>
         </LoadingContext.Provider>

      </aside >
   )

}

export {
   Filters,
   FiltersContext
}
