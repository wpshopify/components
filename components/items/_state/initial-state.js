import { hashQueryParams, hasHooks } from '../../../common/utils'

function checkHasMore(options) {
   if (!options.componentPayload || !options.componentOptions.pageSize || !options.componentOptions.pagination) {
      return false
   }

   var payload = options.componentPayload
   var payloadLength = payload.length
   var limit = options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false
   var pageSize = options.componentOptions.pageSize
   var lastItem = payload[payloadLength - 1]

   if (!lastItem) {
      return false
   }

   var hasNextPage = lastItem.hasNextPage

   if (!limit) {
      return hasNextPage
   }

   if (pageSize === payloadLength) {
      if (pageSize === limit) {
         return false
      } else if (limit < payloadLength) {
         return false
      } else {
         return true
      }
   } else {
      if (payloadLength > limit) {
         return false
      } else {
         return hasNextPage
      }
   }
}

function hashInitialPayloadCache(queryParams, payload) {
   let initalPayloadCache = {}

   if (payload) {
      var hashId = hashQueryParams(queryParams)
      initalPayloadCache[hashId] = payload
   }

   return initalPayloadCache
}

function ItemsInitialState(options = {}) {
   var itemsState = {
      componentOptions: options.componentOptions,
      element: options.componentElement,
      payload: options.componentPayload ? options.componentPayload : [],
      queryParams: options.componentQueryParams ? options.componentQueryParams : {},
      originalParams: options.originalParams ? options.originalParams : false,
      dataType: options.componentOptions.dataType ? options.componentOptions.dataType : 'products',
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      lastCursorId: options.componentPayloadLastCursor ? options.componentPayloadLastCursor : false,
      totalShown: options.componentPayload ? options.componentPayload.length : 0,
      noResultsText: options.componentOptions.noResultsText ? options.componentOptions.noResultsText : 'No items left',
      isLoading: false,
      hasMoreItems: checkHasMore(options),
      notices: [],
      lastQuery: options.componentQueryParams ? options.componentQueryParams.query : false,
      payloadCache: hashInitialPayloadCache(options.componentQueryParams, options.componentPayload)
   }

   hasHooks() ? wp.hooks.doAction('items.init', itemsState) : ''

   return itemsState
}

export { ItemsInitialState }
