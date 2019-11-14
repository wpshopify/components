import React from "react"
import { ProductProvider } from "./_state/provider"
import { ProductWrapper } from "./wrapper"

function Product({ payload, isFirstItem }) {
  return (
    <ProductProvider payload={payload}>
      <ProductWrapper isFirstItem={isFirstItem} />
    </ProductProvider>
  )
}

export { Product }
