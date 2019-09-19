import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Panel, PanelBody } from '@wordpress/components'

import { Title } from './title'
import { Tag } from './tag'
import { Vendor } from './vendor'
import { ProductType } from './product-type'
import { ProductId } from './product-id'
import { CreatedAt } from './created-at'
import { UpdatedAt } from './updated-at'
import { AvailableForSale } from './available-for-sale'
import { Connective } from './connective'
import { SortBy } from './sort-by'
import { Reverse } from './reverse'
import { Pagination } from './pagination'
import { PageSize } from './page-size'
import { Limit } from './limit'
import { ItemsPerRow } from './items-per-row'
import { Excludes } from './excludes'
import { StorefrontAccessToken } from './storefront-access-token'
import { MyShopifyDomain } from './my-shopify-domain'

function PostEditor() {
   const editorCSS = css`
      width: 300px;
      border-top: 0;
      padding-bottom: 100px;
      height: calc(100vh - 85px);
      position: fixed;
      top: 0;
   `

   return (
      <Panel header='Shortcode Settings' css={editorCSS} className='edit-post-sidebar'>
         <PanelBody title='Show products by' initialOpen={false}>
            <Title />
            <Tag />
            <Vendor />
            <ProductType />
            <ProductId />
            <CreatedAt />
            <UpdatedAt />
            <AvailableForSale />
            <Connective />
         </PanelBody>

         <PanelBody title='Sorting' initialOpen={false}>
            <SortBy />
            <Reverse />
         </PanelBody>

         <PanelBody title='Pagination' initialOpen={false}>
            <Pagination />
            <PageSize />
            <Limit />
         </PanelBody>

         <PanelBody title='Layout' initialOpen={false}>
            <ItemsPerRow />
            <Excludes />
         </PanelBody>

         <PanelBody title='Colors' initialOpen={false}>
            Colors
         </PanelBody>

         <PanelBody title='Advanced' initialOpen={false}>
            <StorefrontAccessToken />
            <MyShopifyDomain />
         </PanelBody>
      </Panel>
   )
}

export { PostEditor }
