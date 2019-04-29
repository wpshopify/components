function PaginationItemsInitialState(options) {
   console.log('<PaginationItemsInitialState> :: options')

   return {
      payload: options.payload ? options.payload : [],
      isLoading: false,
      lastPayload: options.lastPayload ? options.lastPayload : false
   }
}

export { PaginationItemsInitialState }
