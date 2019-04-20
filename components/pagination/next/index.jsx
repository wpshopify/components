import React, { useContext } from 'react'
import { fetchNextPage, queryProducts, getProductsFromQuery, getProductsFromIds, fetchByCollectionTitle } from '@wpshopify/api'

import { PaginationContext } from '../_state/context'
import to from 'await-to-js'

function PaginationNext() {
   const { paginationState, paginationDispatch } = useContext(PaginationContext)

   async function onNextPage() {
      // const collectionTitle = await fetchByCollectionTitle()
      // console.log('collectionTitle', collectionTitle)

      // console.log('paginationState.payload', paginationState.payload)

      // const firstFive = await queryProducts({
      //    first: 5
      // })

      // console.log('firstFive', firstFive)

      try {
         console.log('paginationState.payload', paginationState.payload)

         let firstFiveNext = await fetchNextPage(paginationState.payload)
         console.log('FETCHED!!!!!!!!!!!!!!!!', firstFiveNext)
      } catch (error) {
         console.log('FETCHED ERRRRRRRRRRR!!!!!!!!!!!!!!!!', error)
      }

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
