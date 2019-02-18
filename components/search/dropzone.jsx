import React from 'react';
import ReactDOM from 'react-dom';
import { Items } from '../items';


function DropZone({ dropZone, items }) {

  const dropZoneElement = document.querySelector(dropZone);

  return (
    <>
      {
        (!dropZone ? (

          <Items data={items}></Items>

        ) : (

            ReactDOM.createPortal(
              <Items data={items}></Items>,
              dropZoneElement
            )

          ))
      }

    </>
  )

}

export {
  DropZone
}
