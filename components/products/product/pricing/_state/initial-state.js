function ProductPricingInitialState(productsState) {
   return {
      prices: [],
      showingRange: productsState.componentOptions.showingPriceRange,
      showingCompareAt: productsState.componentOptions.showingCompareAt
   }
}

export { ProductPricingInitialState }
