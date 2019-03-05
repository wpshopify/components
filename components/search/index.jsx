import 'babel-polyfill';
import React, { useState, useEffect, useRef } from 'react';
import { queryProducts, fetchByTitleParams } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { useDebounce } from 'use-debounce';
import { DropZone } from '../dropzone';
import { LoadingContext } from '../../common/context';



/*

Component: Search

*/
function Search(props) {

   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [searchData, setSearchData] = useState([]);
   const isFirstRender = useRef(true);

   const debouncedSearchTerm = useDebounce(searchTerm, 300);


   /*
 
   Use Effect
 
   */

   useEffect(() => {

      if (!isFirstRender.current) {
         getResults();
         return;
      }

      console.log('Intial Render: Search Component');
      isFirstRender.current = false;

   }, [debouncedSearchTerm]);



   function fetchProducts() {
      console.log('fetchProducts from <Search />');
      return queryProducts(fetchByTitleParams(debouncedSearchTerm));
   }


   /*
 
   Get products on search change
 
   */
   const getResults = async () => {

      setIsLoading(true);

      const results = await fetchProducts();

      console.log('results ', results);

      setSearchData(results);
      setIsLoading(false);

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

         <LoadingContext.Provider value={{ isLoading: isLoading, from: 'search' }}>
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
