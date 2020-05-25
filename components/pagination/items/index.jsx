import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { v4 as uuidv4 } from 'uuid'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { Notice } = wp.components

function PaginationItems({ children }) {
  const [itemsState] = useContext(ItemsContext)
  const [paginationState] = useContext(PaginationContext)

  function displayItems() {
    return itemsState.payload.map((item) => {
      return wp.element.cloneElement(children, {
        payload: item,
        key: uuidv4(),
        itemsState: itemsState,
      })
    })
  }

  const itemsListCSS = css`
    display: grid;
    grid-template-columns: repeat(${itemsState.payloadSettings.itemsPerRow}, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    max-width: 580px;
    margin: 0 auto;
  `

  return (
    itemsState.payload && (
      <section className='wps-items-wrapper'>
        <section className='wps-items wps-items-list' css={itemsListCSS}>
          {itemsState.payload && itemsState.payload.length ? displayItems() : ''}
        </section>

        {paginationState.controlsTouched && !itemsState.hasMoreItems && (
          <Notice status='info' isDismissible={false}>
            {itemsState.noResultsText}
          </Notice>
        )}
      </section>
    )
  )
}

export { PaginationItems }
