import { underscoreToCamel } from '../../../common/utils'

function ShopInitialState(options = false) {
  return {
    checkout: { lineItems: [] },
    checkoutId: false,
    isShopReady: options.isShopReady ? true : false,
    isCartReady: options.isCartReady ? true : false,
    checkoutCache: {
      lineItems: [],
      variants: [],
      total: 0.0
    },
    notices: [],
    info: {
      currencyCode: 'USD',
      primaryDomain: {
        url: ''
      }
    },
    isDirectCheckoutOccurring: false,
    isCartEmpty: true,
    isMobile: wpshopify.misc.isMobile,
    hooksCompatible: false,
    discountCode: false,
    settings: underscoreToCamel(wpshopify.settings)
  }
}

export { ShopInitialState }
