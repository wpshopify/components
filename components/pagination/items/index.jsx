import { PaginationContext } from '../_state/context'
import PaginationItemsMap from './map'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { Notice } = wp.components

function PaginationItems({
  children,
  payload,
  payloadSettings,
  isLoading,
  hasMoreItems,
  noResultsText,
}) {
  const [paginationState] = useContext(PaginationContext)

  const PaginationItemsCSS = css`
    display: grid;
    grid-template-columns: repeat(${payload.length === 1 ? 1 : payloadSettings.itemsPerRow}, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    max-width: ${payload.length === 1 || payloadSettings.itemsPerRow === 1 ? '300px' : '775px'};
    margin: 0;
    opacity: ${isLoading ? 0.4 : 1};
  `

  return (
    payload && (
      <section className='wps-items-wrapper'>
        <section className='wps-items wps-items-list' css={PaginationItemsCSS}>
          {payload && payload.length && (
            <PaginationItemsMap payload={payload} payloadSettings={payloadSettings}>
              {children}
            </PaginationItemsMap>
          )}
        </section>

        {paginationState.controlsTouched && !hasMoreItems && (
          <Notice status='info' isDismissible={false}>
            {noResultsText}
          </Notice>
        )}
      </section>
    )
  )
}

export default wp.element.memo(PaginationItems)
