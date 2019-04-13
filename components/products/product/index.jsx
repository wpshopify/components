import 'babel-polyfill'
import React, { useReducer, useContext, useEffect } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductReducer } from './reducer'
import { ProductContext } from './context'
import { getProductInitialState } from './initial-state'

function Product({ options }) {
   const [state, dispatch] = useReducer(ProductReducer, getProductInitialState(options))

   const isShowing = type => {
      if (!state.excludes) {
         return true
      }

      return !state.excludes.includes(type)
   }

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
