import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { containerFluidCSS, rowCSS } from '../../../common/css'
import { __t } from '../../../common/utils'
import { v4 as uuidv4 } from 'uuid'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { Notice } = wp.components

function PaginationItems({ children }) {
  const [itemsState] = useContext(ItemsContext)
  const [paginationState] = useContext(PaginationContext)

  console.log('<PaginationItems> :: Render Start')

  function displayItems() {
    return itemsState.payload.map((item) => {
      return wp.element.cloneElement(children, {
        payload: item,
        key: uuidv4(),
      })
    })
  }

  return (
    itemsState.payload && (
      <section className={'wps-items-wrapper'} css={containerFluidCSS}>
        <section
          className='wps-items wps-items-list'
          css={rowCSS}
          data-item-is-loading={itemsState.isLoading}>
          {itemsState.payload && itemsState.payload.length ? displayItems() : ''}
        </section>

        {paginationState.controlsTouched && !itemsState.hasMoreItems && (
          <Notice status='info' isDismissible={false}>
            {__t(itemsState.noResultsText)}
          </Notice>
        )}
      </section>
    )
  )
}

export { PaginationItems }
