import React, { useState, useEffect, useReducer } from 'react'
import { Product } from './product'
import isEmpty from 'lodash/isEmpty'
import uuidv4 from 'uuid/v4'

import { Pagination } from '../pagination'
import { PaginationContext } from '../pagination/_state/context'
import { PaginationReducer } from '../pagination/_state/reducer'
import { getPaginationInitialState } from '../pagination/_state/initial-state'

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

   const [state, dispatch] = useReducer(PaginationReducer, getPaginationInitialState(options))

   console.log('state!!!', state)

   return (
      <>
         {isEmpty(options.componentItems) ? (
            <span className='wps-notice wps-notice-inline wps-notice-warning'>{options.noResultsText}</span>
         ) : (
            <PaginationContext.Provider
               value={{
                  paginationState: state,
                  paginationDispatch: dispatch
               }}>
               <section className={'wps-products wps-products-' + options.type} data-wps-test={state.isLoading}>
                  {state.componentItems.map(productOption => (
                     <Product key={uuidv4()} options={productOption} />
                  ))}
               </section>

               <Pagination />
            </PaginationContext.Provider>
         )}
      </>
   )
}

// Products.defaultProps = productsDefaultProps()

export { Products }
