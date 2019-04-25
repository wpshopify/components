import React, { useContext } from 'react'
import { CollectionContext } from '../_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { usePortal } from '../../../../common/hooks'

function CollectionImage() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)

   return usePortal(
      <>
         <div className='wps-component wps-component-collection-image' data-wps-component-order='0'>
            <img
               itemProp='image'
               src={collectionState.payload.image.src}
               className='wps-product-image'
               alt={collectionState.payload.image.altText}
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
            />
         </div>
      </>,
      collectionState.element
   )
}

export { CollectionImage }
