import 'babel-polyfill'
import React, { useReducer, useContext, useMemo } from 'react'
import { ProductTitle } from './title'
import { ProductPricing } from './pricing'
import { ProductDescription } from './description'
import { ProductBuyButton } from './buy-button'
import { ProductImages } from './images'
import { ProductReducer } from './_state/reducer'
import { ProductContext } from './_state/context'
import { getProductInitialState } from './_state/initial-state'
import { ProductsContext } from '../_state/context'

function Product({ payload }) {
   const { productsState } = useContext(ProductsContext)
   const [state, dispatch] = useReducer(ProductReducer, getProductInitialState(payload))

   const isShowing = type => {
      if (!productsState.componentOptions.excludes) {
         return true
      }

      return !productsState.componentOptions.excludes.includes(type)
   }

   return useMemo(
      () => (
         <div className='wps-item'>
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
      ),
      [payload]
   )
}

export { Product }
