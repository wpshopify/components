import React, { useContext, useEffect, useState, useRef } from "react"
import { findPortalElement } from "../../../../common/utils"
import { usePortal } from "../../../../common/hooks"
import { Items } from "../../../items"
import { Products } from "../../../products"
import { CollectionContext } from "../_state/context"
import { ItemsContext } from "../../../items/_state/context"
import { PaginationContext } from "../../../pagination/_state/context"

function CollectionProducts() {
  const [collectionState, collectionDispatch] = useContext(CollectionContext)
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const [paginationState, paginationDispatch] = useContext(PaginationContext)
  const isFirstRender = useRef(true)

  function updateCollectionProducts(payload) {
    collectionDispatch({ type: "UPDATE_PRODUCTS", payload: payload })
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      return
    }

    collectionDispatch({
      type: "SET_PRODUCT_OPTIONS",
      payload: [
        {
          componentPayload: collectionState.productOptions[0]
            ? collectionState.productOptions[0].componentPayload
            : collectionState.products,
          componentOptions: itemsState.componentOptions.products,
          componentConnectionParams:
            paginationState.componentOptions.componentConnectionParams,
          componentElement: false,
          dataType: "products",
          type: "list",
          noResultsText: "No products left to show",
          originalParams: {
            type: "collections",
            queryParams: itemsState.queryParams,
            connectionParams: {
              first: parseInt(itemsState.componentOptions.products.pageSize),
              reverse: itemsState.componentOptions.products.reverse,
              sortKey: itemsState.componentOptions.products.sortBy
            }
          },
          componentQueryParams: {
            first: parseInt(itemsState.componentOptions.products.pageSize),
            reverse: itemsState.componentOptions.products.reverse,
            sortKey: itemsState.componentOptions.products.sortBy
          }
        }
      ]
    })
  }, [])

  return usePortal(
    <Items options={collectionState.productOptions}>
      <Products miscDispatch={updateCollectionProducts} />
    </Items>,
    findPortalElement(
      itemsState.element,
      itemsState.componentOptions.dropzoneCollectionProducts
    )
  )
}

export { CollectionProducts }
