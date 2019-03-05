import React, { useContext, useRef, useEffect, useState } from 'react';
import { FiltersContext } from '../filters';
import { PaginationNext } from './next';
import { PaginationPrev } from './prev';
import { PaginationPageSize } from './page-size';


function PaginationWrapper() {

   const { hasResults, hasNextPage } = useContext(FiltersContext);

   return (
      <>
         {
            !hasResults ? '' :
               hasNextPage
                  ? <PaginationNext />
                  : <PaginationPrev />


         }

         <PaginationPageSize />

      </>
   )

}

export {
   PaginationWrapper
}
