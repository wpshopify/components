import { getPrices } from '../../../../../common/pricing/data'

function ProductPricingInitialState(props) {
   return {
      prices: getPrices(props.productState.payload),
      showingRange: props.productsState.componentOptions.showingPriceRange,
      showingCompareAt: props.productsState.componentOptions.showingCompareAt
   }
}

export { ProductPricingInitialState }
