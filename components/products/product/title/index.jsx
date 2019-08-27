import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, hasHooks, FilterHook } from '../../../../common/utils'
import { Link } from '../../../link'
import { hasSinglePage } from '../../../../common/settings'
import { onSinglePage } from '../../../../common/components'

/** @jsx jsx */
import { jsx } from '@emotion/core'

function ProductTitle() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)
   const [itemsState] = useContext(ItemsContext)

   function getTitleClass() {
      const defaultVal = 'wps-products-title'
      return hasHooks() ? wp.hooks.applyFilters('product.title.class', defaultVal) : defaultVal
   }

   return usePortal(
      <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
         {hasSinglePage() && !onSinglePage(itemsState) ? (
            <Link type='products' payload={productState.payload} shop={shopState}>
               <Title title={productState.payload.title} classList={getTitleClass()} isShopReady={shopState.isShopReady ? '1' : '0'} />
            </Link>
         ) : (
            <Title title={productState.payload.title} classList={getTitleClass()} isShopReady={shopState.isShopReady ? '1' : '0'} product={productState.payload} />
         )}
      </div>,
      findPortalElement(productState.element, itemsState.componentOptions.dropzoneProductTitle)
   )
}

function Title(props) {
   return (
      <>
         <FilterHook name='product.title.before' args={[props.product]} isReady={props.isShopReady} />

         <h2 itemProp='name' className={props.classList} data-wps-is-ready={props.isShopReady} css={{ color: '#111' }}>
            {props.title}
         </h2>

         <FilterHook name='product.title.after' args={[props.product]} isReady={props.isShopReady} />
      </>
   )
}

export default ProductTitle
