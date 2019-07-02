import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

function CollectionDescription({ isShopReady }) {
   const [collectionState] = useContext(CollectionContext)
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <div itemProp='description' className='wps-collections-description' data-wps-is-ready={isShopReady ? '1' : '0'} dangerouslySetInnerHTML={{ __html: collectionState.payload.descriptionHtml }} />,
      findPortalElement(collectionState.element, itemsState.componentOptions.dropzoneCollectionDescription)
   )
}

export { CollectionDescription }
