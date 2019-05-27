import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { Link } from '../../../link'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'
import { hasSinglePage } from '../../../../common/settings'
import { onSinglePage } from '../../../../common/components'

function CollectionTitle() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)
   const [itemsState] = useContext(ItemsContext)

   function Title() {
      return (
         <h2 itemProp='name' className='wps-collection-title' data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
            {collectionState.payload.title}
         </h2>
      )
   }

   return usePortal(
      <div className='wps-component wps-component-collection-title' data-wps-component-order='0'>
         {hasSinglePage() && !onSinglePage(itemsState) ? (
            <Link type='collections' shop={shopState} payload={collectionState.payload}>
               <Title />
            </Link>
         ) : (
            <Title />
         )}
      </div>,
      findPortalElement(collectionState.element, itemsState.componentOptions.dropzoneCollectionTitle)
   )
}

export { CollectionTitle }
