import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

function ProductDescription() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <div
         itemProp='description'
         className='wps-products-description'
         data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         dangerouslySetInnerHTML={{ __html: productState.payload.descriptionHtml }}
      />,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductDescription)
   )
}

export default ProductDescription
