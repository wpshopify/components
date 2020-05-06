function CollectionInitialState({ payload, itemsState }) {
  console.log('CollectionInitialState itemsState', itemsState)
  console.log('CollectionInitialState payload', payload)

  return {
    payload: payload,
    products: payload.products ? payload.products : false,
    productOptions: [
      {
        componentType: 'products',
        noResultsText: 'No products left to show',
        payloadSettings: itemsState.payloadSettings.products,
        connectionParams: {
          first: parseInt(itemsState.payloadSettings.products.pageSize),
          reverse: itemsState.payloadSettings.products.reverse,
          sortKey: itemsState.payloadSettings.products.sortBy,
          query: itemsState.payloadSettings.products.query,
        },
      },
    ],
    element: false,
    selectedVariant: false,
  }
}

export { CollectionInitialState }
