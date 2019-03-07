import React, { useContext, useRef, useEffect, useState } from 'react';
import { FiltersContext } from '../filters';
import { PaginationNext } from './next';
import { PaginationPrev } from './prev';
import { PaginationPageSize } from './page-size';


function PaginationWrapper() {

   const { hasResults, hasPrevPage, hasNextPage, searchData } = useContext(FiltersContext);



   // useEffect(() => {

   //    // console.log('PaginationWrapper hasNextPage ', hasNextPage);
   //    // console.log('PaginationWrapper hasPrevPage ', hasPrevPage);
   //    // console.log('PaginationWrapper hasResults ', hasResults);

   // }, [searchData]);



   return (
      <>
         {
            !hasResults ? '' :
               hasNextPage ? <PaginationNext /> : 'No more products to show!'

         }

         <PaginationPageSize />

      </>
   )

}

export {
   PaginationWrapper
}
