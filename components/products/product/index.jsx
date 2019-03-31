import 'babel-polyfill'
import React, { useReducer } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductReducer } from './reducer'
import { ProductContext } from './context'
import { getProductInitialState } from './initial-state'

function Product(props) {
   const [state, dispatch] = useReducer(ProductReducer, getProductInitialState(props))
   console.log('state.excludes', state.excludes)

   const isShowing = type => !state.excludes.includes(type)

   return (
      <div className='wps-product'>
         <ProductContext.Provider
            value={{
               productState: state,
               productDispatch: dispatch
            }}>
            {isShowing('images') ? <ProductImages /> : ''}
            {isShowing('title') ? <ProductTitle /> : ''}
            {isShowing('pricing') ? <ProductPricing /> : ''}
            {isShowing('description') ? <ProductDescription /> : ''}
            {isShowing('buy-button') ? <ProductBuyButton /> : ''}
         </ProductContext.Provider>
      </div>
   )
}

export { Product }
