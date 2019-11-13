import React, { useContext } from "react"
import { PaginationContext } from "../_state/context"
import { ItemsContext } from "../../items/_state/context"
import { Notice } from "../../notice"
import { containerFluidCSS, rowCSS } from "../../../common/css"
import uuidv4 from "uuid/v4"
// import Masonry from 'react-masonry-css'

/** @jsx jsx */
import { jsx, css } from "@emotion/core"

function PaginationItems({ children, alignHeight }) {
  const [itemsState] = useContext(ItemsContext)
  const [paginationState] = useContext(PaginationContext)

  function isFirstItem(i, lastPageIndex) {
    return i === lastPageIndex
  }

  function mapPayload() {
    var lastPageIndex = itemsState.payload.length - itemsState.queryParams.first

    return itemsState.payload.map((item, i) => {
      return React.cloneElement(children, {
        payload: item,
        key: uuidv4(),
        isFirstItem: isFirstItem(i, lastPageIndex)
      })
    })
  }

  return (
    <section className={"wps-items-wrapper"} css={containerFluidCSS}>
      <section
        className="wps-items wps-items-list"
        css={rowCSS}
        data-item-is-loading={itemsState.isLoading}
        data-is-align-height={alignHeight}
      >
        {/* <Masonry className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
               
            </Masonry> */}

        {mapPayload()}
      </section>

      {paginationState.controlsTouched && !itemsState.hasMoreItems ? (
        <Notice message={itemsState.noResultsText} type="info" />
      ) : (
        ""
      )}
    </section>
  )
}

export { PaginationItems }
