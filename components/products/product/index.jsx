import React, { useContext } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ItemsContext } from '../../items/_state/context'
import { ProductProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

function Product({ payload }) {
   const [itemsState] = useContext(ItemsContext)
   console.log('itemsState :::::::::::::::::::', itemsState)

   return (
      <div className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item p-3`}>
         <ProductProvider payload={payload}>
            {isShowingComponent(itemsState, 'images') && <ProductImages />}
            {isShowingComponent(itemsState, 'title') && <ProductTitle />}
            {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
            {isShowingComponent(itemsState, 'description') && <ProductDescription />}
            {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
         </ProductProvider>
      </div>
   )
}

export { Product }
