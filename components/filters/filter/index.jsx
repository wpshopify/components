import React, { useEffect, useState } from 'react';

function Filter(props) {

   const [drawToggle, setDrawToggle] = useState(false);

   function toggleDrawer() {
      setDrawToggle(!drawToggle);
   }

   return (
      <div className="wps-filter" data-wps-drawer-toggle={drawToggle}>
         <h3 className="wps-drawer-trigger wps-filter-heading" onClick={toggleDrawer}>{props.heading} <span className="wps-drawer-icon"></span></h3>
         <div className="wps-drawer-content">
            {props.children}
         </div>
      </div>
   )

}

export default Filter;
