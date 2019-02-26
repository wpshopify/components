import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Items } from '../items';

import { LoadingContext } from '../../common/context';


function DropZone({ dropZone, items }) {

   const { isFiltering } = useContext(LoadingContext);

   console.log('isFiltering ', isFiltering);

   const dropZoneElement = document.querySelector(dropZone);

   console.log('dropZoneElement ', dropZoneElement);

   return (
      <>
         {
            !dropZone
               ? <Items items={items}></Items>
               : ReactDOM.createPortal(
                  <Items items={items}></Items>,
                  dropZoneElement
               )
         }

      </>
   )

}

export {
   DropZone
}
