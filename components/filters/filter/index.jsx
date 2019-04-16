import React, { useState } from 'react'
import { capitalizeFirstLetter } from '../../../common/utils'

function Filter({ heading, children }) {
   const [drawerToggle, setDrawerToggle] = useState(false)

   function toggleDrawer() {
      setDrawerToggle(!drawerToggle)
   }

   return (
      <div className='wps-filter' data-wps-drawer-toggle={drawerToggle}>
         <h3 className='wps-drawer-trigger wps-filter-heading' onClick={toggleDrawer}>
            {capitalizeFirstLetter(heading)} <span className='wps-drawer-icon' />
         </h3>
         <div className='wps-drawer-content'>{children}</div>
      </div>
   )
}

export { Filter }
