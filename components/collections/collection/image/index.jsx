import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CollectionContext } from '../_state/context'

function CollectionImage() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)

   return (
      <div className='wps-component wps-component-collection-image' data-wps-component-order='0'>
         <img
            itemProp='image'
            src={collectionState.payload.image ? collectionState.payload.image.src : ''}
            className='wps-product-image'
            alt={collectionState.payload.image ? collectionState.payload.image.altText : ''}
            data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         />
      </div>
   )
}

export { CollectionImage }
