import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CollectionContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'

function CollectionDescription() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)

   return usePortal(
      <div
         itemProp='description'
         className='wps-collections-description'
         data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         dangerouslySetInnerHTML={{ __html: collectionState.payload.descriptionHtml }}
      />,
      collectionState.element
   )
}

export { CollectionDescription }
