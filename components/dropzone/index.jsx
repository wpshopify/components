import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Items } from '../items';

import { LoadingContext } from '../../common/context';


function DropZone({ dropZone, items }) {

   const { from } = useContext(LoadingContext);

   const dropZoneElement = document.querySelector(dropZone);

   return (
      <>
         {
            !dropZone
               ? <Items items={items} from={from}></Items>
               : ReactDOM.createPortal(
                  <Items items={items} from={from}></Items>,
                  dropZoneElement
               )
         }

      </>
   )

}

export {
   DropZone
}
