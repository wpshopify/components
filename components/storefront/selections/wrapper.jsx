/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { StorefrontSelectionsClear } from './clear'
import { StorefrontSelectionsTypes } from './types'

function StorefrontSelectionsWrapper() {
  const StorefrontSelectionsWrapperCSS = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
  `

  return (
    <div className='wps-filter-selections' css={StorefrontSelectionsWrapperCSS}>
      <StorefrontSelectionsTypes />
      <StorefrontSelectionsClear />
    </div>
  )
}

export { StorefrontSelectionsWrapper }
