import React, { useReducer, useEffect, useRef, useState, useContext } from 'react'
import { Product } from './product'
import isEmpty from 'lodash/isEmpty'
import uuidv4 from 'uuid/v4'

import { ProductsProvider } from './_state/provider'
import { PaginationItemsContext } from '../pagination/items/_state/context'

/*

Props has the same shape as productsDefaultProps

*/
function Products({ options }) {
   console.log('<Products>')

   const [paginationItemsState] = useContext(PaginationItemsContext)
   const isFirstRender = useRef(true)

   useEffect(
      function() {
         if (isFirstRender.current) {
            isFirstRender.current = false
            return
         }

         console.log('PAGINATION PAYLOAD IS LOADING UPDATED')

         // productsDispatch({ type: 'UPDATE_PAYLOAD', payload: paginationItemsState.payload })
      },
      [paginationItemsState.isLoading]
   )

   return (
      <>
         {isEmpty(paginationItemsState.payload) ? (
            <span className='wps-notice wps-notice-inline wps-notice-warning'>{options.noResultsText}</span>
         ) : (
            <ProductsProvider options={options}>
               {paginationItemsState.payload.map(productPayload => (
                  <Product key={uuidv4()} payload={productPayload} />
               ))}
            </ProductsProvider>
         )}
      </>
   )
}

export { Products }
