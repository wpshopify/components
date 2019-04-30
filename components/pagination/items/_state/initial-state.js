function PaginationItemsInitialState(options) {
   return {
      payload: options.payload ? options.payload : [],
      lastPayload: options.lastPayload ? options.lastPayload : false,
      isLoading: false
   }
}

export { PaginationItemsInitialState }
