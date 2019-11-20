import React, { useContext } from "react"
import { Collection } from "./collection"
import { Pagination } from "../pagination"
import { ShopContext } from "../shop/_state/context"
import { ItemsContext } from "../items/_state/context"

function Collections() {
  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)

  return (
    <Pagination shopSettings={shopState.settings}>
      <Collection
        itemsState={itemsState}
        isShopReady={shopState.isShopReady}
        shopInfo={shopState.info}
        shopSettings={shopState.settings}
      />
    </Pagination>
  )
}

export { Collections }
