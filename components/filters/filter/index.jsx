import React, { useState } from 'react'

function Filter(props) {
   const [drawerToggle, setDrawerToggle] = useState(false)

   function toggleDrawer() {
      setDrawerToggle(!drawerToggle)
   }

   return (
      <div className='wps-filter' data-wps-drawer-toggle={drawerToggle}>
         <h3 className='wps-drawer-trigger wps-filter-heading' onClick={toggleDrawer}>
            {props.heading} <span className='wps-drawer-icon' />
         </h3>
         <div className='wps-drawer-content'>{props.children}</div>
      </div>
   )
}

export { Filter }
