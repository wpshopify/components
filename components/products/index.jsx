import React, { useReducer } from 'react'
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
import hash from 'object-hash'

/*

Props has the same shape as productsDefaultProps

*/
function Products({ options }) {
   const [productsState, productsDispatch] = useReducer(ProductsReducer, getProductsInitialState(options))
   const [paginationState, paginationDispatch] = useReducer(PaginationReducer, getPaginationInitialState(options))

   return usePortal(
      <>
         {console.log('<Products /> ........... RENDERING')}
         {isEmpty(productsState.payload) ? (
            <span className='wps-notice wps-notice-inline wps-notice-warning'>{options.noResultsText}</span>
         ) : (
            <ProductsContext.Provider
               value={{
                  productsState: productsState,
                  productsDispatch: productsDispatch
               }}>
               <section className={'wps-items wps-items-' + productsState.type} data-item-is-loading={productsState.isLoading}>
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

export { Products }
