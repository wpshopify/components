import { getPrices } from '../../../../../common/pricing/data'

function ProductPricingInitialState(props) {
   return {
      prices: getPrices(props.productState.payload),
      showPriceRange: props.productsState.componentOptions.showPriceRange,
      showCompareAt: props.productsState.componentOptions.showCompareAt
   }
}

export { ProductPricingInitialState }
