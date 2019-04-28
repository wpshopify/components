import React, { useContext } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductsContext } from '../_state/context'
import { ProductProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'

function Product({ payload }) {
   const [productsState] = useContext(ProductsContext)

   return (
      <div className='wps-item'>
         <ProductProvider payload={payload}>
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
