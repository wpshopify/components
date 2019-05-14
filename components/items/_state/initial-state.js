function checkHasMore(options) {
   if (!options.componentPayload || !options.componentOptions.pageSize || !options.componentOptions.pagination) {
      return false
   }

   var payload = options.componentPayload
   var payloadLength = payload.length
   var limit = options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false
   var pageSize = options.componentOptions.pageSize
   var lastItem = payload[payloadLength - 1]

   console.log('lastItemlastItemlastItemlastItemlastItem', lastItem)

   if (!lastItem) {
      return false
   }

   var hasNextPage = lastItem.hasNextPage

   // console.log('pageSize', pageSize)
   // console.log('limit', limit)
   // console.log('payloadLength ', payloadLength)

   if (!limit) {
      return hasNextPage
   }

   if (pageSize === payloadLength) {
      if (pageSize === limit) {
         // console.log('_________________ 2')
         return false
      } else if (limit < payloadLength) {
         // console.log('_________________ 3')
         return false
      } else {
         // console.log('_________________ 4')
         return true
      }
   } else {
      if (payloadLength > limit) {
         // console.log('_________________ 5')
         return false
      } else {
         // console.log('_________________ 6')
         return hasNextPage
      }
   }

   // console.log('checkHasMore options', options)
   // console.log('options.componentPayload.length', options.componentPayload.length)
   // console.log('parseInt(options.componentOptions.limit)', parseInt(options.componentOptions.limit))

   // return true
}

function ItemsInitialState(options = {}) {
   return {
      componentOptions: options.componentOptions,
      element: options.componentElement,
      payload: options.componentPayload ? options.componentPayload : [],
      queryParams: options.componentQueryParams ? options.componentQueryParams : {},
      originalParams: options.componentQueryParams ? options.componentQueryParams : false,
      dataType: options.componentOptions.dataType ? options.componentOptions.dataType : 'products',
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      lastCursorId: options.componentPayloadLastCursor ? options.componentPayloadLastCursor : false,
      totalShown: options.componentPayload ? options.componentPayload.length : 0,
      noResultsText: options.componentOptions.noResultsText ? options.componentOptions.noResultsText : 'No items left',
      isLoading: false,
      hasMoreItems: checkHasMore(options)
   }
}

export { ItemsInitialState }
