import React, { useState, useEffect, useReducer } from 'react'
import { Product } from './product'
import isEmpty from 'lodash/isEmpty'
import uuidv4 from 'uuid/v4'
import { usePortal } from '../../common/hooks'
import { Pagination } from '../pagination'
import { PaginationContext } from '../pagination/_state/context'
import { PaginationReducer } from '../pagination/_state/reducer'
import { getPaginationInitialState } from '../pagination/_state/initial-state'

import { ProductsContext } from './_state/context'
import { ProductsReducer } from './_state/reducer'
import { getProductsInitialState } from './_state/initial-state'

// function productsDefaultProps() {
//    return {
//       products: []
//    }
// }

// function sortItems(items, sortType) {
//    return sortBy(items, function(item) {
//       return item.product[sortType]
//    })
// }

/*

Props has the same shape as productsDefaultProps

*/
function Products({ options }) {
   console.log('products options ..', options)

   const [productsState, productsDispatch] = useReducer(ProductsReducer, getProductsInitialState(options))
   const [paginationState, paginationDispatch] = useReducer(PaginationReducer, getPaginationInitialState(options))

   console.log('productsState!!!', productsState)
   console.log('paginationState!!! ', paginationState)

   return usePortal(
      <>
         {isEmpty(productsState.payload) ? (
            <span className='wps-notice wps-notice-inline wps-notice-warning'>{options.noResultsText}</span>
         ) : (
            <ProductsContext.Provider
               value={{
                  productsState: productsState,
                  productsDispatch: productsDispatch
               }}>
               <section className={'wps-items-' + productsState.type} data-wps-test={productsState.isLoading}>
                  {productsState.payload.map(productPayload => (
                     <Product key={uuidv4()} payload={productPayload} />
                  ))}
               </section>

               <PaginationContext.Provider
                  value={{
                     paginationState: paginationState,
                     paginationDispatch: paginationDispatch
                  }}>
                  <Pagination />
               </PaginationContext.Provider>
            </ProductsContext.Provider>
         )}
      </>,
      productsState.element
   )
}

// Products.defaultProps = productsDefaultProps()

export { Products }
