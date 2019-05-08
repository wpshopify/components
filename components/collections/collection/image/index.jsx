import React, { useContext } from 'react'
import { ItemsContext } from '../../../items/_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { usePortal } from '../../../../common/hooks'

function CollectionImage() {
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <>
         <div className='wps-component wps-component-collection-image' data-wps-component-order='0'>
            <img itemProp='image' src={itemsState.payload.image.src} className='wps-product-image' alt={itemsState.payload.image.altText} data-wps-is-ready={shopState.isShopReady ? '1' : '0'} />
         </div>
      </>,
      itemsState.element
   )
}

export { CollectionImage }
