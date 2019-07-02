import React, { useContext, useEffect } from 'react'
import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionProducts } from './products'
import { ItemsContext } from '../../items/_state/context'
import { CollectionProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

function Collection({ payload, isShopReady, shopInfo, shopSettings }) {
   const [itemsState] = useContext(ItemsContext)
   console.log('<Collection>')

   return (
      <div className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item p-3`}>
         <CollectionProvider payload={payload}>
            {isShowingComponent(itemsState, 'image') && <CollectionImage isShopReady={isShopReady} shopInfo={shopInfo} shopSettings={shopSettings} />}
            {isShowingComponent(itemsState, 'title') && <CollectionTitle isShopReady={isShopReady} shopInfo={shopInfo} />}
            {isShowingComponent(itemsState, 'description') && <CollectionDescription isShopReady={isShopReady} />}
            {isShowingComponent(itemsState, 'products') && itemsState.componentOptions.single && <CollectionProducts />}
         </CollectionProvider>
      </div>
   )
}

export { Collection }
