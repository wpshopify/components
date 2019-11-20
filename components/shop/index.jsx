import React from "react"
import { ShopProvider } from "./_state/provider"
import { Bootstrap } from "../bootstrap"
import { GlobalNotices } from "./notices"

function Shop({ options, children }) {
  return (
    <ShopProvider options={options}>
      <Bootstrap>{children}</Bootstrap>
      <GlobalNotices />
    </ShopProvider>
  )
}

export { Shop }
