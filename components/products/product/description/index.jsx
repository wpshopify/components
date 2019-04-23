import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function ProductDescription() {
   const [shopState] = useContext(ShopContext)
   const [productState] = useContext(ProductContext)

   return usePortal(
      <div
         itemProp='description'
         className='wps-products-description'
         data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         dangerouslySetInnerHTML={{ __html: productState.payload.descriptionHtml }}
      />,
      productState.element
   )
}

export { ProductDescription }
