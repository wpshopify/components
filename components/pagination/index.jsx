import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { PaginationWrapper } from './wrapper';
import { LoadingContext } from '../../common/state/context';


function Pagination({ dropZone }) {

   return (
      <>
         {
            ReactDOM.createPortal(
               dropZone ? <PaginationWrapper /> : '',
               document.querySelector(dropZone)
            )
         }
      </>
   )

}

export {
   Pagination
}
