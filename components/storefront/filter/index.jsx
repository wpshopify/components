/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../common/utils'

function StorefrontFilter({ heading, children }) {
  const { useState } = wp.element
  const [drawerToggle, setDrawerToggle] = useState(() => false)

  function toggleDrawer() {
    setDrawerToggle(!drawerToggle)
  }

  const filterHeadingCSS = css`
    font-size: 18px;
    background: blue;
    transition: all 0.3s ease;
    background: #dfdfdf;
    padding: 0.5em;
    margin: 0;
    position: relative;

    &:hover {
      cursor: pointer;
      background-color: #d1d1d1;
    }
  `

  const drawerIconCSS = css`
    position: absolute;
    width: 14px;
    height: 14px;
    display: inline-block;
    right: 1em;
    top: calc(50% - 7px);

    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: #111;
      transition: transform 0.3s ease;
    }

    &:before {
      top: 0;
      left: 50%;
      width: 3px;
      height: 100%;
      margin-left: -1px;
      transform: ${drawerToggle ? 'rotate(90deg)' : 'rotate(180deg)'};
    }

    &:after {
      top: 50%;
      left: 0;
      width: 100%;
      height: 3px;
      margin-top: -1px;
    }
  `

  const FilterCSS = css`
    margin-bottom: 5px;
  `

  const drawerContentCSS = css`
    max-height: ${drawerToggle ? '350px' : '0'};
    overflow: ${drawerToggle ? 'scroll' : 'hidden'};
  `

  return (
    <div className='wps-filter' css={FilterCSS} data-wps-drawer-toggle={drawerToggle}>
      <h3
        className='wps-drawer-trigger wps-filter-heading'
        css={filterHeadingCSS}
        onClick={toggleDrawer}>
        {heading}
        <span className='wps-drawer-icon' css={drawerIconCSS} />
      </h3>
      <div className='wps-drawer-content' css={drawerContentCSS}>
        {children}
      </div>
    </div>
  )
}

export { StorefrontFilter }
