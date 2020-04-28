import { __t } from '../../../common/utils'

function CartInitialState(options) {
  return {
    isUpdating: false,
    isCheckingOut: false,
    isCartOpen: false,
    termsAccepted: true,
    isCartEmpty: true,
    isCartLoaded: false,
    isCartInteractive: false,
    isCartReady: false,
    buttons: options,
    notices: [],
    checkoutCache: {
      lineItems: [],
      variants: [],
      total: 0.0,
    },
    shopInfo: false,
    customAttributes: [],
    note: false,
    totalLineItems: 0,
    title: wp.hooks.applyFilters('default.cart.title', __t('Shopping cart')),
    checkoutText: wp.hooks.applyFilters('default.cart.checkout.text', __t('Begin checkout')),
  }
}

export { CartInitialState }
