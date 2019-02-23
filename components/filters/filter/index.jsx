import React, { useEffect } from 'react';

function Filter(props) {

   return (
      <div className="wps-filter">
         <h3 className="wps-filter-heading">{props.heading}</h3>
         {props.children}
      </div>
   )

}

export default Filter;
