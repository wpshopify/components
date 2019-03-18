import React, { useContext, useRef, useEffect, useState } from 'react';
import { fetchNextPage } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { FiltersContext } from '../filters';


function PaginationNext() {

   const { searchData, setSearchData, setIsLoading, isLoading } = useContext(FiltersContext);

   async function onNextPage() {

      try {

         setIsLoading(true);

         var newProducts = await fetchNextPage(searchData);

         setSearchData(searchData.concat(newProducts.model));
         setIsLoading(false);

      } catch (err) {
         console.log('newProducts ERR', err);
      }

   }


   return (
      <button type="button" disabled={isLoading} className="wps-button wps-btn-next-page" onClick={onNextPage}>
         {isLoading ? 'Loading ...' : 'Load more'}
      </button>
   )

}

export {
   PaginationNext
}
