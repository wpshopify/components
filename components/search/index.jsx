import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import { queryProducts } from '@wpshopify/api';
import { useDebounce } from 'use-debounce';
import { DropZone } from './dropzone';
import { LoadingContext } from '../../common/context';


/*

Component: Search

*/
function Search(props) {

   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setisLoading] = useState(false);
   const [isIntialRender, setIsIntialRender] = useState(true);
   const [searchData, setSearchData] = useState([]);

   const debouncedSearchTerm = useDebounce(searchTerm, 300);


   /*
 
   Search Value
 
   */
   function searchValue(value) {
      return "title:" + value + "*";
   }


   /*
 
   Use Effect
 
   */

   useEffect(() => {

      console.log('use effect');

      if (!isIntialRender) {
         getResults();
         return;
      }

      setIsIntialRender(false);

   }, [debouncedSearchTerm]);



   function fetchProducts() {

      return queryProducts({
         first: 20,
         sortKey: 'PRICE',
         query: searchValue(debouncedSearchTerm),
         reverse: false
      });

   }


   /*
 
   Get products on search change
 
   */
   const getResults = async () => {

      setisLoading(true);

      const results = await fetchProducts();

      console.log('results ', results);

      setSearchData(results);
      setisLoading(false);

   }




   /*
 
   Return
 
   */
   return (
      <>
         <form role="search" className="wps-search-form">

            <div className="is-loading">{isLoading ? 'Loading ...' : ''}</div>

            <div className="wps-search-wrapper">

               <input
                  type="search"
                  id="wps-search-input"
                  name="search"
                  val={debouncedSearchTerm}
                  placeholder="Search the store"
                  aria-label="Search store"
                  onChange={e => setSearchTerm(e.target.value)}
               />

               <button className="wps-search-submit">Search</button>

            </div>

         </form>

         <LoadingContext.Provider value={isLoading}>
            <DropZone dropZone={props.dropZone} items={searchData}></DropZone>
         </LoadingContext.Provider>

      </>

   )

}


function defaultProps() {

   return {
      dropZone: false
   }

}

Search.defaultProps = defaultProps();

export {
   Search
}
