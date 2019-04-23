import React, { useContext } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductsContext } from '../_state/context'
import { ProductProvider } from './_state/provider'

function Product({ payload }) {
   const [productsState] = useContext(ProductsContext)

   const isShowing = type => {
      if (!productsState.componentOptions.excludes) {
         return true
      }

      return !productsState.componentOptions.excludes.includes(type)
   }

   console.log('<Product> Render')

   return (
      <div className='wps-item'>
         <ProductProvider payload={payload}>
            {isShowing('images') ? <ProductImages /> : ''}
            {isShowing('title') ? <ProductTitle /> : ''}
            {isShowing('pricing') ? <ProductPricing /> : ''}
            {isShowing('description') ? <ProductDescription /> : ''}
            {isShowing('buy-button') ? <ProductBuyButton /> : ''}
         </ProductProvider>
      </div>
   )
}

export { Product }
