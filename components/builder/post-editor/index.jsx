import React, { useContext, useEffect, useState } from "react"
import { BuilderContext } from "../_state/context"

/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Panel, PanelBody, Notice } from "@wordpress/components"

import { Title } from "./title"
import { Tag } from "./tag"
import { Vendor } from "./vendor"
import { ProductType } from "./product-type"
import { ProductId } from "./product-id"
import { CreatedAt } from "./created-at"
import { UpdatedAt } from "./updated-at"
import { AvailableForSale } from "./available-for-sale"
import { Connective } from "./connective"
import { SortBy } from "./sort-by"
import { Reverse } from "./reverse"
import { Pagination } from "./pagination"
import { NoResultsText } from "./no-results-text"
import { PageSize } from "./page-size"
import { Limit } from "./limit"
import { ItemsPerRow } from "./items-per-row"
import { Excludes } from "./excludes"
import { StorefrontAccessToken } from "./storefront-access-token"
import { MyShopifyDomain } from "./my-shopify-domain"
import { UpdateCredentialsButton } from "./update-credentials"
import { InfiniteScroll } from "./infinite-scroll"
import { InfiniteScrollOffset } from "./infinite-scroll-offset"
import { AddToCartButtonColor } from "./add-to-cart-button-color"
import { AddToCartButtonText } from "./add-to-cart-button-text"
import { VariantButtonColor } from "./variant-button-color"
import { HideQuantity } from "./hide-quantity"
import { ShowQuantityLabel } from "./show-quantity-label"
import { QuantityLabelText } from "./quantity-label-text"
import { MinQuantity } from "./min-quantity"
import { MaxQuantity } from "./max-quantity"
import { ShowPriceRange } from "./show-price-range"
import { ShowCompareAt } from "./show-compare-at"
import { ShowFeaturedOnly } from "./show-featured-only"
import { ShowZoom } from "./show-zoom"
import { TitleSize } from "./title-size"
import { TitleColor } from "./title-color"
import { DescriptionSize } from "./description-size"
import { DescriptionColor } from "./description-color"
import { DescriptionLength } from "./description-length"
import { AlignHeight } from "./align-height"

function PostEditor() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  const editorCSS = css`
    width: 300px;
    border-top: 0;
    padding-bottom: 100px;
    height: calc(100vh - 60px);
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: scroll;
  `

  return (
    <Panel
      header="Shortcode Settings"
      css={editorCSS}
      className="edit-post-sidebar"
    >
      <PanelBody title="Store Settings" initialOpen={true}>
        {!builderState.hasCustomConnection && (
          <Notice status="Informational" isDismissible={false}>
            See your own products by adding your Shopify API keys.&nbsp;
            <a
              href="https://docs.wpshop.io/#/getting-started/syncing"
              target="_blank"
            >
              Learn where to find these.
            </a>
          </Notice>
        )}
        <StorefrontAccessToken />
        <MyShopifyDomain />
        <UpdateCredentialsButton />
      </PanelBody>

      <PanelBody title="Filtering" initialOpen={false}>
        <Title />
        <Tag />
        <Vendor />
        <ProductType />
        <AvailableForSale />
        <Connective />
      </PanelBody>

      <PanelBody title="Sorting" initialOpen={false}>
        <SortBy />
        <Reverse />
      </PanelBody>

      <PanelBody title="Pagination" initialOpen={false}>
        <Pagination />
        <PageSize />
        <Limit />
        <NoResultsText />
        <InfiniteScroll />
        <InfiniteScrollOffset />
      </PanelBody>

      <PanelBody title="Layout" initialOpen={false}>
        <ItemsPerRow />
        <Excludes />
        <AlignHeight />
      </PanelBody>

      <PanelBody title="Title" initialOpen={false}>
        <TitleSize />
        <TitleColor />
      </PanelBody>

      <PanelBody title="Description" initialOpen={false}>
        <DescriptionSize />
        <DescriptionColor />
        <DescriptionLength />
      </PanelBody>

      <PanelBody title="Pricing" initialOpen={false}>
        <ShowPriceRange />
        <ShowCompareAt />
      </PanelBody>

      <PanelBody title="Images" initialOpen={false}>
        <ShowFeaturedOnly />
        <ShowZoom />
      </PanelBody>

      <PanelBody title="Buy Button" initialOpen={false}>
        <AddToCartButtonColor />
        <AddToCartButtonText />
        <VariantButtonColor />
        <HideQuantity />
        <ShowQuantityLabel />
        <QuantityLabelText />
        <MinQuantity />
        <MaxQuantity />
      </PanelBody>
    </Panel>
  )
}

export { PostEditor }
