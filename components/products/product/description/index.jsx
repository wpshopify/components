import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductDescription() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   const fontSize = css`
      font-size: ${itemsState.componentOptions.descriptionSize};
   `

   const fontColor = css`
      color: ${itemsState.componentOptions.descriptionColor};
   `

   function maybeTruncateDescription() {
      if (!itemsState.componentOptions.descriptionLength) {
         return productState.payload.descriptionHtml
      } else {
         return productState.payload.descriptionHtml.substring(0, itemsState.componentOptions.descriptionLength) + ' ...'
      }
   }

   return usePortal(
      <div css={[fontSize, fontColor]} itemProp='description' className='wps-products-description' data-wps-is-ready={shopState.isShopReady ? '1' : '0'} dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }} />,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductDescription)
   )
}

export default ProductDescription
