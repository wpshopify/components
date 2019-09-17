import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Panel, PanelBody } from '@wordpress/components'

import { Title } from './title'
import { Tag } from './tag'
import { Vendor } from './vendor'
import { ProductType } from './product_type'
import { ProductId } from './product_id'
import { CreatedAt } from './created_at'
import { UpdatedAt } from './updated_at'
import { AvailableForSale } from './available_for_sale'
import { Connective } from './connective'
import { SortBy } from './sort_by'
import { Reverse } from './reverse'
import { Pagination } from './pagination'
import { PageSize } from './page_size'
import { Limit } from './limit'
import { ItemsPerRow } from './items_per_row'
import { Excludes } from './excludes'
import { DropzoneLoadMore } from './dropzone_load_more'
import { StorefrontAccessToken } from './storefront-access-token'
import { MyShopifyDomain } from './my-shopify-domain'

function PostEditor() {
   const editorCSS = css`
      width: 300px;
      border-top: 0;
      height: calc(100vh - 170px);
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

         <PanelBody title='Dropzones' initialOpen={false}>
            <DropzoneLoadMore />
         </PanelBody>

         <PanelBody title='Advanced' initialOpen={false}>
            <StorefrontAccessToken />
            <MyShopifyDomain />
         </PanelBody>
      </Panel>
   )
}

export { PostEditor }
