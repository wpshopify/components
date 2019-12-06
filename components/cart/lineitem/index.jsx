import React, { useContext, useRef, useEffect, useState } from "react"
import { CartContext } from "../../cart/_state/context"
import { ShopContext } from "../../shop/_state/context"
import { Link } from "../../link"
import { CartLineItemQuantity } from "./quantity"
import { formatPriceToCurrency } from "../../../common/pricing/formatting"
import { calcLineItemTotal, isAvailable } from "../../../common/products"
import { addCustomSizingToImageUrl } from "../../../common/images"
import { containerFluidCSS } from "../../../common/css"
import { Notice } from "../../notice"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import find from "lodash/find"
import { hasHooks } from "../../../common/utils"

function getLineItemFromState(lineItem, lineItemsFromState) {
  return find(lineItemsFromState, { variantId: lineItem.id })
}

function CartLineItem({ lineItem, index }) {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [shopState] = useContext(ShopContext)

  const [isUpdating] = useState(false)
  const [lineItemQuantity, setLineItemQuantity] = useState(0)
  const [lineItemTotal, setLineItemTotal] = useState(0)

  const variantId = useRef(false)
  const lineItemElement = useRef()
  const isFirstRender = useRef(true)
  const lineItemTotalElement = useRef()

  function removeLineItem(e) {
    cartDispatch({
      type: "REMOVE_LINE_ITEM",
      payload: {
        lineItem: variantId.current,
        checkoutId: shopState.checkoutId
      }
    })

    cartDispatch({
      type: "UPDATE_LINE_ITEM_QUANTITY",
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: 0
        },
        checkoutId: shopState.checkoutId
      }
    })
  }

  useEffect(() => {
    let lineItemFound = getLineItemFromState(
      lineItem,
      cartState.checkoutCache.lineItems
    )

    if (lineItemFound) {
      variantId.current = lineItemFound.variantId

      setLineItemQuantity(lineItemFound.quantity)
      setLineItemTotal(
        calcLineItemTotal(lineItem.price, lineItemFound.quantity)
      )
    }
  }, [cartState.checkoutCache.lineItems])

  function placeholderImageUrl() {
    return WP_Shopify.pluginsDirURL + "public/imgs/placeholder.png"
  }

  function actualImageUrl() {
    return addCustomSizingToImageUrl({
      src: lineItem.image.src,
      width: 300,
      height: 300,
      crop: "center"
    })
  }

  function lineItemImage() {
    return lineItem.image
      ? { backgroundImage: `url(${actualImageUrl()})` }
      : { backgroundImage: `url(${placeholderImageUrl()})` }
  }

  function hasRealVariant() {
    return lineItem.title !== "Default Title"
  }

  const manualLink = hasHooks()
    ? wp.hooks.applyFilters("cart.lineItems.link", false, lineItem, cartState)
    : false

  const disableLink = hasHooks()
    ? wp.hooks.applyFilters(
        "cart.lineItems.disableLink",
        false,
        lineItem,
        cartState
      )
    : false

  return (
    <div
      className="wps-cart-lineitem mr-0 ml-0 row"
      data-wps-is-updating={isUpdating}
      data-wps-is-available={isAvailable(lineItem)}
      ref={lineItemElement}
    >
      <Link
        payload={lineItem}
        shop={shopState}
        type="products"
        classNames="wps-cart-lineitem-img-link"
        target="_blank"
        manualLink={manualLink}
        disableLink={disableLink}
      >
        <div
          className="wps-cart-lineitem-img"
          style={lineItemImage()}
          data-wps-is-ready={shopState.isCartReady ? "1" : "0"}
        />
      </Link>

      <div className="wps-cart-lineitem-content">
        <div
          className="wps-cart-lineitem-title col-12 p-0"
          data-wps-is-ready={shopState.isCartReady ? "1" : "0"}
          data-wps-is-empty={hasRealVariant() ? "false" : "true"}
        >
          <div className="p-0" css={containerFluidCSS}>
            <div className="row">
              <span className="wps-cart-lineitem-title-content col-9">
                {lineItem.product.title}
              </span>
              <span
                className="wps-cart-lineitem-remove"
                onClick={removeLineItem}
              >
                Remove
              </span>
            </div>
          </div>
        </div>

        {hasRealVariant() && (
          <div
            className="wps-cart-lineitem-variant-title badge badge-pill badge-dark col-12"
            data-wps-is-ready={shopState.isCartReady}
          >
            {lineItem.title}
          </div>
        )}

        {!isAvailable(lineItem) ? (
          <Notice type="warning" message="Out of stock" />
        ) : (
          <div className="p-0" css={containerFluidCSS}>
            <div className="row">
              <div className="col-8">
                <CartLineItemQuantity
                  lineItem={lineItem}
                  variantId={variantId}
                  lineItemQuantity={lineItemQuantity}
                  setLineItemQuantity={setLineItemQuantity}
                  isReady={shopState.isCartReady}
                  isFirstRender={isFirstRender}
                  setLineItemTotal={setLineItemTotal}
                  lineItemTotalElement={lineItemTotalElement}
                />
              </div>

              <div className="wps-cart-lineitem-price-total-wrapper">
                <div
                  className="wps-cart-lineitem-price wps-cart-lineitem-price-total"
                  data-wps-is-ready={shopState.isCartReady ? "1" : "0"}
                  ref={lineItemTotalElement}
                >
                  {shopState.isCartReady &&
                    formatPriceToCurrency(
                      lineItemTotal,
                      shopState.info.currencyCode
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { CartLineItem }
