import React, { useContext, useState } from 'react'
import { fetchNextPage, graphQuery, queryProducts, getProductsFromQuery, getProductsFromIds, fetchByCollectionTitle } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

import { PaginationContext } from '../_state/context'
import to from 'await-to-js'

function PaginationNext() {
   const { paginationState, paginationDispatch } = useContext(PaginationContext)
   const [isFirstLoad, setIsFirstLoad] = useState(true)
   const [lastPayload, setLastPayload] = useState(false)

   async function onNextPage() {
      if (isFirstLoad) {
         // Calls Shopify
         const shopifyResponse = await graphQuery('products', {
            after: 'eyJsYXN0X2lkIjoyMjE2ODMwMjA2MDAwLCJsYXN0X3ZhbHVlIjoiMjIxNjgzMDIwNjAwMCJ9',
            first: 3,
            query: ['2216921399344', '2216958951472', '2216868610096', '2216830206000', '2216928542768', '2216820572208', '2216808972336', '2216996241456']
         })

         console.log('NEXT shopifyResponse', shopifyResponse)

         shopifyResponse.model.products.map(product => console.log('Product: ', product.title))

         setIsFirstLoad(false)
         setLastPayload(shopifyResponse.model.products)
      } else {
         console.log('lastPayload', lastPayload)

         if (lastPayload[lastPayload.length - 1].hasNextPage) {
            console.log('has more, fetching ...')
            const nextPageOfResults = await fetchNextPage(lastPayload)
            nextPageOfResults.model.map(product => console.log('Product: ', product.title))
            setLastPayload(nextPageOfResults.model)
         } else {
            console.log('No more to fetch!')
         }
      }

      // console.log('shopifyResponse.model.products', shopifyResponse.model.products)
      // try {
      //    const nextPageOfResults = await fetchNextPage(shopifyResponse.model.products)
      //    console.log('nextPageOfResults', nextPageOfResults)
      //    nextPageOfResults.model.map(product => console.log('Product: ', product.title))

      //    const stillMoreNextPageOfResults = await fetchNextPage(nextPageOfResults.model)
      //    console.log('stillMoreNextPageOfResults ::', stillMoreNextPageOfResults)
      // } catch (errrr) {
      //    console.log('errrr', errrr)
      // }

      // try {
      //    const firstFiveNext = await fetchNextPage(window.testing.model.products)
      //    console.log('FETCHED!!!!!!!!!!!!!!!!', firstFiveNext)
      // } catch (error) {
      //    console.log('FETCHED ERRRRRRRRRRR!!!!!!!!!!!!!!!!', error)
      // }
      // let payloadNext = await fetchNextPage(paginationState.payload)
      // console.log('payloadNext', payloadNext)
      // try {
      //    paginationDispatch({ type: 'SET_IS_LOADING', payload: true })
      //    let newItems = await fetchNextPage(paginationState.payload)
      //    console.log('newItems', newItems)
      //    // setpayload(paginationState.payload.concat(newItems.model))
      //    paginationDispatch({ type: 'SET_PAYLOAD', payload: paginationState.componentItems.concat(newItems.model) })
      //    // setIsLoading(false)
      //    paginationDispatch({ type: 'SET_IS_LOADING', payload: false })
      // } catch (err) {
      //    console.log('newItems ERR', err)
      // }
   }

   return (
      <button type='button' disabled={paginationState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
         {paginationState.isLoading ? 'Loading ...' : 'Load more'}
      </button>
   )
}

export { PaginationNext }
