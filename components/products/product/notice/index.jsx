import React from 'react';

function ProductNotice(props) {

   console.log('<ProductNotice>');

   return (

      <div className={`wps-product-notice wps-product-notice-${props.type}`}>
         {props.children}
      </div>

   )

}

export {
   ProductNotice
}