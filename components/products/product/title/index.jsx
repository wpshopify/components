import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'
import { Link } from '../../../link'
import { hasSinglePage } from '../../../../common/settings'
import { onSinglePage } from '../../../../common/components'

function ProductTitle() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   console.log(':::: shopState.info ::::', shopState.info)

   function Title() {
      return (
         <h2 itemProp='name' className='wps-products-title' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
            {productState.payload.title}
         </h2>
      )
   }

   return usePortal(
      <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
         {hasSinglePage() && !onSinglePage(itemsState) ? (
            <Link type='products' payload={productState.payload} shop={shopState}>
               <Title />
            </Link>
         ) : (
            <Title />
         )}
      </div>,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductTitle)
   )
}

export { ProductTitle }
