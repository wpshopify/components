import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'

function CollectionDescription() {
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <div
         itemProp='description'
         className='wps-collections-description'
         data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         dangerouslySetInnerHTML={{ __html: itemsState.payload.descriptionHtml }}
      />,
      itemsState.element
   )
}

export { CollectionDescription }
