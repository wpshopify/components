import { hasLink } from '../../../../common/settings';
import {
  isOnSale,
  hasManyVariants,
  getInitialQuantity,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

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
    preSelectVariant: wp.hooks.applyFilters(
      'product.buyButton.preSelectVariant',
      false,
      payload
    ),
    payloadSettings: payloadSettings, // read only
    payload: payload, // read only
    componentId: componentId, // read only
  };
}

export { ProductInitialState };
