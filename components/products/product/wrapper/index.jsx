import React, { useContext } from "react"
import { ItemsContext } from "../../../items/_state/context"
import { ProductContext } from "../_state/context"
import { isShowingComponent } from "../../../../common/components"
import { itemWidthClass } from "../../../../common/utils"

const ProductTitle = React.lazy(() =>
  import(/* webpackChunkName: 'ProductTitle' */ "../title")
)
const ProductPricing = React.lazy(() =>
  import(/* webpackChunkName: 'ProductPricing' */ "../pricing")
)
const ProductDescription = React.lazy(() =>
  import(/* webpackChunkName: 'ProductDescription' */ "../description")
)
const ProductBuyButton = React.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButton' */ "../buy-button")
)
const ProductImages = React.lazy(() =>
  import(/* webpackChunkName: 'ProductImages' */ "../images")
)

function ProductWrapper({ isFirstItem }) {
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  return (
    <div
      className={`${itemWidthClass(
        itemsState.componentOptions.itemsPerRow
      )} wps-item p-3`}
      data-is-first-item={isFirstItem}
      data-is-dropdown-open={productState.isDropdownOpen}
    >
      {isShowingComponent(itemsState, "images") && <ProductImages />}
      {isShowingComponent(itemsState, "title") && <ProductTitle />}
      {isShowingComponent(itemsState, "pricing") && <ProductPricing />}
      {isShowingComponent(itemsState, "description") && <ProductDescription />}
      {isShowingComponent(itemsState, "buy-button") && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }
