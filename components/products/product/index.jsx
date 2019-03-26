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
   console.log('propspropspropsprops', props)

   const [state, dispatch] = useReducer(ProductReducer, getProductInitialState(props))
   console.log('<Product> state', state)

   return (
      <div className='wps-product'>
         <ProductContext.Provider
            value={{
               productState: state,
               productDispatch: dispatch
            }}>
            {!state.excludes.includes('images') ? <ProductImages /> : ''}
            {!state.excludes.includes('title') ? <ProductTitle /> : ''}
            {!state.excludes.includes('pricing') ? <ProductPricing /> : ''}
            {!state.excludes.includes('description') ? <ProductDescription /> : ''}
            {!state.excludes.includes('buy-button') ? <ProductBuyButton /> : ''}
         </ProductContext.Provider>
      </div>
   )
}

export { Product }
