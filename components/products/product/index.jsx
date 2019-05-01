import React, { useContext } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductsContext } from '../_state/context'
import { ProductProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

function Product({ payload }) {
   const [productsState] = useContext(ProductsContext)

   return (
      <div className={`${itemWidthClass(productsState.componentOptions.itemsPerRow)} wps-item wps-p-3`}>
         <ProductProvider payload={payload}>
            {atob(payload.id)}
            {isShowingComponent(productsState, 'images') ? <ProductImages /> : ''}
            {isShowingComponent(productsState, 'title') ? <ProductTitle /> : ''}
            {isShowingComponent(productsState, 'pricing') ? <ProductPricing /> : ''}
            {isShowingComponent(productsState, 'description') ? <ProductDescription /> : ''}
            {isShowingComponent(productsState, 'buy-button') ? <ProductBuyButton /> : ''}
         </ProductProvider>
      </div>
   )
}

export { Product }
