import React from 'react';

function CartNotice(props) {
   console.log('<CartNotice>');

   return (

      <div className="wps-cart-notice">

         {props.children}

      </div>

   )

}

export {
   CartNotice
}