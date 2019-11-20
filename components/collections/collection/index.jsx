import React from "react"
import { CollectionImage } from "./image"
import { CollectionTitle } from "./title"
import { CollectionDescription } from "./description"
import { CollectionProducts } from "./products"
import { CollectionProvider } from "./_state/provider"
import { isShowingComponent } from "../../../common/components"
import { itemWidthClass } from "../../../common/utils"

const Collection = React.memo(function Collection({
  itemsState,
  payload,
  isShopReady,
  shopInfo,
  shopSettings
}) {
  return (
    <div
      className={`${itemWidthClass(
        itemsState.componentOptions.itemsPerRow
      )} wps-item p-3`}
    >
      <CollectionProvider payload={payload}>
        {isShowingComponent(itemsState, "image") && (
          <CollectionImage
            isShopReady={isShopReady}
            shopInfo={shopInfo}
            shopSettings={shopSettings}
          />
        )}
        {isShowingComponent(itemsState, "title") && (
          <CollectionTitle isShopReady={isShopReady} shopInfo={shopInfo} />
        )}
        {isShowingComponent(itemsState, "description") && (
          <CollectionDescription isShopReady={isShopReady} />
        )}
        {isShowingComponent(itemsState, "products") &&
          itemsState.componentOptions.single && <CollectionProducts />}
      </CollectionProvider>
    </div>
  )
})

export { Collection }
