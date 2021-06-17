import { hasLink } from '../../../../common/settings';

function hasManyVariants(payload) {
  if (!payload.variants) {
    return false;
  }

  if (!payload.variants.length) {
    return false;
  }

  if (payload.variants.length === 1 && payload.variants[0].title === 'Default Title') {
    return false;
  }

  return true;
}

function isOnSale(payload) {
  const onSaleVariants = payload.variants.filter((variant) => variant.compareAtPriceV2);

  if (onSaleVariants === undefined || onSaleVariants.length == 0) {
    return false;
  }

  return true;
}

function getInitialQuantity(payloadSettings) {
  if (!payloadSettings.minQuantity) {
    return 1;
  }

  return payloadSettings.minQuantity;
}

function ProductInitialState({ payload, payloadSettings, componentId }) {
  return {
    element: false,
    selectedVariant: false,
    addedToCart: false,
    isTouched: false,
    hasManyImages: payload.images && payload.images.length > 1 ? true : false,
    hasManyVariants: hasManyVariants(payload),
    isOnSale: isOnSale(payload),
    hasLink: hasLink(payloadSettings),
    selectedOptions: {},
    availableVariants: [],
    notices: [],
    allOptionsSelected: false,
    missingSelections: false,
    quantity: getInitialQuantity(payloadSettings),
    isModalOpen: false,
    selectFirstVariant: wp.hooks.applyFilters(
      'product.buyButton.selectFirstVariant',
      false,
      payload
    ),
    preSelectVariant: wp.hooks.applyFilters('product.buyButton.preSelectVariant', false, payload),
    payloadSettings: payloadSettings, // read only
    payload: payload, // read only
    componentId: componentId, // read only
  };
}

export { ProductInitialState };
