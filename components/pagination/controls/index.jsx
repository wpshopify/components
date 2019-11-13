import React from "react"
import { PaginationPageSize } from "./page-size"
import { PaginationLoadMore } from "./load-more"
import { containerFluidCSS } from "../../../common/css"

/** @jsx jsx */
import { jsx, css } from "@emotion/core"

function PaginationControls({ miscDispatch }) {
  return (
    <section className="wps-pagination-controls" css={containerFluidCSS}>
      <PaginationPageSize />
      <PaginationLoadMore miscDispatch={miscDispatch} />
    </section>
  )
}

export { PaginationControls }
