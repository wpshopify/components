import React, { useContext, useRef, useEffect } from 'react'
import { fetchNextPage, graphQuery, findLastCursorId, findTypeFromPayload } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
// import { fetchNextItems } from '../../items'
import to from 'await-to-js'

function PaginationLoadMore(props) {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   console.log('props', props)

   // const isFirstRender = useRef(true)

   // function setTotalItemsShown(itemsToAdd) {
   //    itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: itemsToAdd })
   // }

   // function setLoadingStates(isLoading) {
   //    itemsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
   // }

   // function setPayloadStates(payload) {
   //    itemsDispatch({ type: 'UPDATE_PAYLOAD', payload: payload })
   // }

   // function setQueryParams(params) {
   //    itemsDispatch({ type: 'SET_QUERY_PARAMS', payload: params })
   // }

   // function setControlsTouched(touched) {
   //    paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: touched })
   // }

   // function resendInitialQuery() {
   //    return graphQuery(findTypeFromPayload(itemsState.payload), itemsState.queryParams)
   // }

   // function getNextResults(lastResults) {
   //    return new Promise(async (resolve, reject) => {
   //       console.log('lastResults', lastResults)

   //       const [newResultsError, newResults] = await to(fetchNextPage(lastResults))

   //       // setTotalItemsShown(newResults.model.length)
   //       // setPayloadStates(newResults.model)

   //       resolve(newResults)
   //    })
   // }

   function onNextPage() {
      // console.log('<PaginationLoadMore> :: itemsState.queryParams :: ', itemsState.queryParams)
      // console.log('<PaginationLoadMore> :: itemsState.lastCursorId :: ', itemsState.lastCursorId)
      // console.log('::::::::: totalShown :: ', itemsState.totalShown)
      // console.log('::::::::: limit :: ', itemsState.limit)
      console.log('props ...', props)

      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: true })
      props.fetchNextItems()
      // setControlsTouched(true)

      // if (!isFirstRender.current) {
      //    console.log('111111111111111111111111111111111')

      //    setLoadingStates(true)
      //    const [resultsError, results] = await to(getNextResults(itemsState.payload))

      //    // setQueryParams(findLastCursorId(results, itemsState.dataType))

      //    return setLoadingStates(false)
      // }

      // isFirstRender.current = false

      // // if (!itemsState.lastCursorId) {
      // //    console.log('22222222222222222222222222222222 resending')
      // //    setLoadingStates(true)

      // //    // Resend original query so that we can get a proper response
      // //    const [responseError, response] = await to(resendInitialQuery())
      // //    console.log('paginationState //////////////', paginationState)
      // //    console.log('response!!!!!!!!!!!!!', response)
      // //    console.log('itemsState', itemsState)

      // //    if (itemsState.dataType === 'products') {
      // //       var newModel = response.model.products
      // //    } else if (itemsState.dataType === 'collections') {
      // //       var newModel = response.model.collections[0].products
      // //    }

      // //    console.log('newModel', newModel)

      // //    const [nextError, nextResponse] = await to(getNextResults(newModel))
      // //    console.log('nextError', nextError)
      // //    console.log('nextResponse', nextResponse)

      // //    setQueryParams(findLastCursorId(nextResponse, itemsState.dataType))

      // //    return setLoadingStates(false)
      // // }

      // setQueryParams({
      //    after: itemsState.lastCursorId
      // })

      // console.log('333333333333333333333333333333')
      // setLoadingStates(true)

      // // console.log('itemsState.queryParams', itemsState.queryParams)
      // // console.log('combineLastCursorWithParams()', combineLastCursorWithParams())

      // console.log('itemsState.queryParams', itemsState.queryParams)

      // const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))
      // console.log('onNextPage', results)

      // setTotalItemsShown(results.model[itemsState.dataType].length)
      // setPayloadStates(results.model[itemsState.dataType])
      // setQueryParams(findLastCursorId(results, itemsState.dataType))
      // setLoadingStates(false)
   }

   return usePortal(
      <>
         {itemsState.hasMoreItems && (
            <button type='button' disabled={itemsState.isLoading} className='wps-button wps-btn-next-page' onClick={() => onNextPage()}>
               {itemsState.isLoading ? 'Loading ⌛️...' : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
