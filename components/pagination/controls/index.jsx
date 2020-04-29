/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'
import { containerFluidCSS } from '../../../common/css'

function PaginationControls() {
  return (
    <section className='wps-pagination-controls' css={containerFluidCSS}>
      <PaginationPageSize />
      <PaginationLoadMore />
    </section>
  )
}

export { PaginationControls }
