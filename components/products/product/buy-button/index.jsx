import React, { useContext } from "react"
import { ProductQuantity } from "./quantity"
import { ProductOptions } from "./options"
import { ProductAddButton } from "./add-button"
import { Notice } from "../../../notice"
import { ProductBuyButtonProvider } from "./_state/provider"
import { ProductContext } from "../_state/context"
import { ItemsContext } from "../../../items/_state/context"
import { ShopContext } from "../../../shop/_state/context"
import { usePortal } from "../../../../common/hooks"
import { findPortalElement, FilterHook } from "../../../../common/utils"


function ProductBuyButton() {
  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  return usePortal(
    <div
      className="wps-buy-button-wrapper"
      data-wps-is-ready={shopState.isCartReady ? "1" : "0"}
      data-wps-component-order="0"
    >

      <FilterHook name="product.buyButton.before" args={[productState]} isReady={shopState.isShopReady} />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {!itemsState.componentOptions.hideQuantity && <ProductQuantity />}
            {productState.hasManyVariants && <ProductOptions />}

            <ProductAddButton />
          </>
        ) : (
          <Notice type="warning" message="Out of stock" />
        )}
      </ProductBuyButtonProvider>

      <FilterHook name="product.buyButton.after" args={[productState]} isReady={shopState.isShopReady} />
      
    </div>,
    findPortalElement(
      productState.element,
      itemsState.componentOptions.dropzoneProductBuyButton
    )
  )
}

export default ProductBuyButton
