import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import { queryProducts, fetchByTitleParams, fetchByTagParams } from '@wpshopify/api';
import { useDebounce } from 'use-debounce';
import { DropZone } from '../dropzone';
import { LoadingContext } from '../../common/context';



/*

Component: Search

*/
function Search(props) {

   const [searchTerm, setSearchTerm] = useState('');
   const [isFiltering, setIsFiltering] = useState(false);
   const [isIntialRender, setIsIntialRender] = useState(true);
   const [searchData, setSearchData] = useState([]);

   const debouncedSearchTerm = useDebounce(searchTerm, 300);


   /*
 
   Use Effect
 
   */

   useEffect(() => {

      if (!isIntialRender) {
         getResults();
         return;
      }

      console.log('Intial Render: Search Component');

      setIsIntialRender(false);

   }, [debouncedSearchTerm]);



   function fetchProducts() {
      return queryProducts(fetchByTitleParams(debouncedSearchTerm));
   }


   /*
 
   Get products on search change
 
   */
   const getResults = async () => {

      setIsFiltering(true);

      const results = await fetchProducts();

      console.log('results ', results);

      setSearchData(results);
      setIsFiltering(false);

   }




   /*
 
   Return
 
   */
   return (
      <>
         <form role="search" className="wps-search-form">

            <div className="is-loading">{isFiltering ? 'Loading ...' : ''}</div>

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

         <LoadingContext.Provider value={{ isFiltering: isFiltering, from: 'search' }}>
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
