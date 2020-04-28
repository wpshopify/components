import { getPrices, getCurrencyCodeFromPayload } from '../../../../../common/pricing/data'

function ProductPricingInitialState(props) {
  return {
    prices: getPrices(props.productState.payload),
    showPriceRange: props.productsState.payloadSettings.showPriceRange,
    showCompareAt: props.productsState.payloadSettings.showCompareAt,
    currencyCode: getCurrencyCodeFromPayload(props.productState.payload),
  }
}

export { ProductPricingInitialState }
