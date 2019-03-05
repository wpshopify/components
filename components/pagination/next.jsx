import React, { useContext, useRef, useEffect, useState } from 'react';
import { fetchNextPage } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import { FiltersContext } from '../filters';


function PaginationNext() {

   const { searchData, setSearchData, setIsLoading } = useContext(FiltersContext);

   async function onNextPage() {
      console.log('onNextPage searchData ', searchData);

      try {

         setIsLoading(true);
         var newProducts = await fetchNextPage(searchData);
         console.log('newProducts.model ', newProducts.model);
         setSearchData(newProducts.model);
         setIsLoading(false);

      } catch (err) {
         console.log('newProducts ERR', err);
      }

   }

   return (
      <button type="button" className="wps-btn-next-page" onClick={onNextPage}>Next page</button>
   )

}

export {
   PaginationNext
}
