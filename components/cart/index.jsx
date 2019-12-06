import React, { useContext } from "react"
import { CartProvider } from "./_state/provider"
import { ShopContext } from "../shop/_state/context"

const CartWrapper = React.lazy(() =>
  import(/* webpackChunkName: 'CartWrapper' */ "./wrapper")
)

function Cart({ options }) {
  return (
    <CartProvider options={options}>
      <CartWrapper />
    </CartProvider>
  )
}

export { Cart }
