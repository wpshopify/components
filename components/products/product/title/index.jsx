import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'
import { Link } from '../../../link'
import { hasSinglePage } from '../../../../common/settings'
import { onSinglePage } from '../../../../common/components'

function Title(props) {
   return (
      <h2 itemProp='name' className={props.classList} data-wps-is-ready={props.isShopReady}>
         {props.title}
      </h2>
   )
}

function ProductTitle() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   function getTitleClass() {
      const defaultVal = 'wps-products-title'
      return wp.hooks ? wp.hooks.applyFilters('product.title.classes', defaultVal) : defaultVal
   }

   return usePortal(
      <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
         {hasSinglePage() && !onSinglePage(itemsState) ? (
            <Link type='products' payload={productState.payload} shop={shopState}>
               <Title title={productState.payload.title} classList={getTitleClass()} isShopReady={shopState.isShopReady ? '1' : '0'} />
            </Link>
         ) : (
            <Title />
         )}
      </div>,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductTitle)
   )
}

export { ProductTitle }
