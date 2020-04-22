import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { containerFluidCSS, rowCSS } from '../../../common/css'
import { v4 as uuidv4 } from 'uuid'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { Notice } = wp.components

function PaginationItems({ children, alignHeight }) {
  const [itemsState] = useContext(ItemsContext)
  const [paginationState] = useContext(PaginationContext)

  function isFirstItem(i, lastPageIndex) {
    return i === lastPageIndex
  }

  function mapPayload() {
    var lastPageIndex = itemsState.payload.length - itemsState.queryParams.first

    return itemsState.payload.map((item, i) => {
      return wp.element.cloneElement(children, {
        payload: item,
        key: uuidv4(),
        isFirstItem: isFirstItem(i, lastPageIndex),
      })
    })
  }

  return (
    <section className={'wps-items-wrapper'} css={containerFluidCSS}>
      <section
        className='wps-items wps-items-list'
        css={rowCSS}
        data-item-is-loading={itemsState.isLoading}
        data-is-align-height={alignHeight}>
        {/* <Masonry className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
               
            </Masonry> */}

        {itemsState.payload.length && mapPayload()}
      </section>

      {paginationState.controlsTouched && !itemsState.hasMoreItems && (
        <PaginationNotice noResultsText={itemsState.noResultsText} />
      )}
    </section>
  )
}

function PaginationNotice({ noResultsText }) {
  return (
    <Notice status='info' isDismissible={false}>
      {noResultsText}
    </Notice>
  )
}

export { PaginationItems }
