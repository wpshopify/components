import React, { useContext } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { Link } from '../../../link'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, _t } from '../../../../common/utils'
import { hasSinglePage } from '../../../../common/settings'
import { onSinglePage } from '../../../../common/components'

function CollectionTitle({ isShopReady, shopInfo }) {
   // const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)
   const [itemsState] = useContext(ItemsContext)

   function Title() {
      return (
         <h2 itemProp='name' className='wps-collection-title' data-wps-is-ready={isShopReady ? '1' : '0'}>
            {collectionState.payload.title}
         </h2>
      )
   }

   return usePortal(
      <div className='wps-component wps-component-collection-title' data-wps-component-order='0'>
         {hasSinglePage() && !onSinglePage(itemsState) && !itemsState.componentOptions.single ? (
            <Link type='collections' shopInfo={shopInfo} payload={collectionState.payload} linkTo={itemsState.componentOptions.linkTo}>
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
