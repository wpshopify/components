import { PaginationContext } from '../_state/context'
import PaginationItemsMap from './map'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { Notice } = wp.components

function PaginationItems({ children, itemsState }) {
  console.log('::::: PaginationItems 1 :::::')
  const [paginationState] = useContext(PaginationContext)

  const itemsListCSS = css`
    display: grid;
    grid-template-columns: repeat(${itemsState.payloadSettings.itemsPerRow}, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    max-width: 775px;
    margin: 0 auto;
    opacity: ${itemsState.isLoading ? 0.4 : 1};
  `

  return (
    itemsState.payload && (
      <section className='wps-items-wrapper'>
        <section className='wps-items wps-items-list' css={itemsListCSS}>
          {itemsState.payload && itemsState.payload.length && (
            <PaginationItemsMap
              payload={itemsState.payload}
              payloadSettings={itemsState.payloadSettings}>
              {children}
            </PaginationItemsMap>
          )}
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

export default wp.element.memo(PaginationItems)
