import React from "react"
import { CartLineItems } from "../lineitems"
import { Notice } from "../../notice"
import { hasHooks } from "../../../common/utils"

function CartContents(props) {
  const defaultEmptyText = "Your cart is empty 🛒"

  function filterEmptyLineItems(lineItems) {
    return lineItems.filter(Boolean)
  }

  return (
    <section
      className="wps-cart-contents"
      data-is-cart-empty={props.isCartEmpty}
      data-wps-is-ready={props.isCartReady ? "1" : "0"}
    >
      {props.isCartEmpty ? (
        <Notice
          type="info"
          message={
            hasHooks()
              ? wp.hooks.applyFilters("cart.empty.text", defaultEmptyText)
              : defaultEmptyText
          }
        />
      ) : (
        <CartLineItems
          lineItems={filterEmptyLineItems(props.checkoutCache.variants)}
        />
      )}
    </section>
  )
}

export default CartContents
