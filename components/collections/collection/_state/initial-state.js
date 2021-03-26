function CollectionInitialState({ payload, payloadSettings }) {
  return {
    payload: payload,
    products: payload.products ? payload.products : false,
    productOptions: [
      {
        payload: payload.products ? payload.products : false,
        componentType: 'products',
        noResultsText: wp.i18n.__('No products left to show', 'wpshopify'),
        payloadSettings: payloadSettings.products,
        connectionParams: {
          first: parseInt(payloadSettings.products.pageSize),
          reverse: payloadSettings.products.reverse,
          sortKey: payloadSettings.products.sortBy,
          query: payloadSettings.products.query,
        },
      },
    ],
    element: false,
    selectedVariant: false,
  };
}

export { CollectionInitialState };
