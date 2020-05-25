/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'
import { containerFluidCSS } from '../../../common/css'
import { isHidingPagination } from '../../../common/pagination'
import { ItemsContext } from '../../items/_state/context'

function PaginationControls() {
  const { useContext } = wp.element
  const [itemsState] = useContext(ItemsContext)

  const paginationControlsCSS = css`
    margin-top: 60px;
  `

  return (
    !isHidingPagination(itemsState) && (
      <section className='wps-pagination-controls' css={[containerFluidCSS, paginationControlsCSS]}>
        <PaginationPageSize />
        <PaginationLoadMore />
      </section>
    )
  )
}

export { PaginationControls }
