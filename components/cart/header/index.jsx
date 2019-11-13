import React from "react"
import { CartTitle } from "../title"
import { CartClose } from "../close"
import { useAction } from "../../../common/hooks"
import { containerFluidCSS } from "../../../common/css"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"

function CartHeader() {
  const isShowingTitle = useAction("show.cart.title", true)
  const isShowingClose = useAction("show.cart.close", true)

  return (
    <section className="wps-cart-header" css={containerFluidCSS}>
      <div className="row">
        {isShowingTitle && <CartTitle />}
        {isShowingClose && <CartClose />}
      </div>
    </section>
  )
}

export default CartHeader
