import { FilterHook } from '../../../common/utils'
const { useState } = wp.element
const { __ } = wp.i18n

function StorefrontFilter({ heading, children }) {
  const [drawerToggle, setDrawerToggle] = useState(() => false)

  function toggleDrawer() {
    setDrawerToggle(!drawerToggle)
  }

  return (
    <div className='wps-filter' data-wps-drawer-toggle={drawerToggle}>
      <h3 className='wps-drawer-trigger wps-filter-heading' onClick={toggleDrawer}>
        <FilterHook name='storefront.filter.text'>
          {__(heading, wpshopify.misc.textdomain)}
        </FilterHook>
        <span className='wps-drawer-icon' />
      </h3>
      <div className='wps-drawer-content'>{children}</div>
    </div>
  )
}

export { StorefrontFilter }
