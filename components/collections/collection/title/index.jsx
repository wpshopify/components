import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CollectionContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function CollectionTitle() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)

   return usePortal(
      <div className='wps-component wps-component-collection-title' data-wps-component-order='0'>
         <h2 itemProp='name' className='wps-collection-title' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
            {collectionState.payload.title}
         </h2>
      </div>,
      collectionState.element
   )
}

export { CollectionTitle }
