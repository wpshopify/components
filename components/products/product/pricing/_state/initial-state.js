import { getPrices, getCurrencyCodeFromPayload } from '../../../../../common/pricing/data';

function ProductPricingInitialState(props) {
  return {
    prices: getPrices(props.payload),
    showPriceRange: props.payloadSettings.showPriceRange,
    showCompareAt: props.payloadSettings.showCompareAt,
    currencyCode: getCurrencyCodeFromPayload(props.payload),
  };
}

export { ProductPricingInitialState };
