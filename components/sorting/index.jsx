import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SortingWrapper } from './wrapper';


function Sorting({ dropZone }) {

   return (

      <>
         {
            ReactDOM.createPortal(
               dropZone ? <SortingWrapper /> : '',
               document.querySelector(dropZone)
            )
         }
      </>

   )

}

export {
   Sorting
}